import {
  createActionGroup,
  createFeatureSelector,
  createReducer,
  createSelector,
  emptyProps,
  on,
  props,
  Store,
} from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { QueryFilter, RequestApi } from '@model';
import { environment } from '@src/environments/environment';
import { Message } from '@utils';

export const ADDRESS_FEATURE_KEY = 'c2de5ff7-24c6-4acc-b844-2dcea6b0b46a';

// ---------------------------------------------------------------------------------------------------------------------
const _actions = createActionGroup({
  source: ADDRESS_FEATURE_KEY,
  events: {
    getProvinceList: props<QueryFilter>(),
    'getProvinceList ok': props<{ provinceList: Province[] }>(),
    setProvinceList: props<{ value: string }>(),

    getDistrictList: props<QueryFilter>(),
    'getDistrictList ok': props<{ districtList: District[] }>(),
    setDistrictList: props<{ value: string }>(),

    getCommuneList: props<QueryFilter>(),
    'getCommuneList ok': props<{ communeList: Commune[] }>(),
    setCommuneList: props<{ value: string }>(),

    error: emptyProps(),
  },
});

// ---------------------------------------------------------------------------------------------------------------------
@Injectable()
export class AddressEffects {
  getProvince$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.getprovincelist),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exhaustMap(({ type, ...query }) => {
        const params = new HttpParams().appendAll(query);
        return this.httpClient.get<RequestApi<Province[]>>(`${environment.apiUrl}tinh`, { params }).pipe(
          map((res) =>
            _actions.getprovincelistOk({
              provinceList: res.data.map((item) => ({ ...item, value: item.maTinh, label: item.tenTinh })),
            }),
          ),
          catchError(async ({ error }) => this.error(error)),
        );
      }),
    ),
  );
  getDistrict$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.getdistrictlist),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exhaustMap(({ type, ...query }) => {
        const params = new HttpParams().appendAll(query);
        return this.httpClient.get<RequestApi<District[]>>(`${environment.apiUrl}huyen`, { params }).pipe(
          map((res) =>
            _actions.getdistrictlistOk({
              districtList: res.data.map((item) => ({ ...item, value: item.districtCode, label: item.districtName })),
            }),
          ),
          catchError(async ({ error }) => this.error(error)),
        );
      }),
    ),
  );
  getCommune$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.getcommunelist),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exhaustMap(({ type, ...query }) => {
        const params = new HttpParams().appendAll(query);
        return this.httpClient.get<RequestApi<Commune[]>>(`${environment.apiUrl}phuong`, { params }).pipe(
          map((res) =>
            _actions.getcommunelistOk({
              communeList: res.data.map((item) => ({ ...item, value: item.communeCode, label: item.communeName })),
            }),
          ),
          catchError(async ({ error }) => this.error(error)),
        );
      }),
    ),
  );

  constructor(private actions$: Actions, private message: Message, private httpClient: HttpClient) {}

  error = (error: RequestApi) => {
    if (error.message) this.message.error(error.message);
    return _actions.error();
  };
}

// ---------------------------------------------------------------------------------------------------------------------
export interface Province {
  maTinh: number;
  tenTinh: string;
  totalDistrictShipDelay: number;
  totalDistrictShipStop: number;
  value: number;
  label: string;
}

export interface District {
  districtCode: number;
  districtName: string;
  description: string;
  provinceCode: number;
  districtFullName: string;
  value: number;
  label: string;
}

export interface Commune {
  communeCode: number;
  communeName: string;
  districtCode: number;
  communeFullName: string;
}

export interface AddressState {
  provinceList: Province[];
  setProvinceList: Province[];
  districtList: District[];
  setDistrictList: District[];
  communeList: Commune[];
  setCommuneList: Commune[];
  isLoading: boolean;
  status:
    | 'idle'
    | 'getProvinceList'
    | 'getProvinceListOk'
    | 'setProvinceList'
    | 'getDistrictList'
    | 'getDistrictListOk'
    | 'setDistrictList'
    | 'getCommuneList'
    | 'getCommuneListOk'
    | 'setCommuneList'
    | 'error';
}

const initialState: AddressState = {
  provinceList: [],
  setProvinceList: [],
  districtList: [],
  setDistrictList: [],
  communeList: [],
  setCommuneList: [],
  isLoading: false,
  status: 'idle',
};

export const addressReducer = createReducer(
  initialState,
  on(_actions.getprovincelist, (_state) => ({ ..._state, isLoading: true, status: 'getProvinceList' })),
  on(_actions.getprovincelistOk, (_state, list) => ({
    ..._state,
    ...list,
    setProvinceList: list.provinceList,
    isLoading: false,
    status: 'getProvinceListOk',
  })),
  on(_actions.setprovincelist, (_state, value) => {
    const searchProvince = (arr: Province[], search: string) =>
      arr.filter((item) => item.tenTinh.toLocaleLowerCase().includes(search));
    return {
      ..._state,
      setProvinceList: searchProvince(_state.provinceList, value.value.toLocaleLowerCase()),
      isLoading: false,
      status: 'setProvinceList',
    };
  }),

  on(_actions.getdistrictlist, (_state) => ({ ..._state, isLoading: true, status: 'getDistrictList' })),
  on(_actions.getdistrictlistOk, (_state, list) => ({
    ..._state,
    ...list,
    setDistrictList: list.districtList,
    isLoading: false,
    status: 'getDistrictListOk',
  })),
  on(_actions.setdistrictlist, (_state, value) => {
    const searchDistrict = (arr: District[], search: string) =>
      arr.filter((item) => item.districtName.toLocaleLowerCase().includes(search));
    return {
      ..._state,
      setDistrictList: searchDistrict(_state.districtList, value.value.toLocaleLowerCase()),
      isLoading: false,
      status: 'setDistrictList',
    };
  }),

  on(_actions.getcommunelist, (_state) => ({ ..._state, isLoading: true, status: 'getCommuneList' })),
  on(_actions.getcommunelistOk, (_state, list) => ({
    ..._state,
    ...list,
    setCommuneList: list.communeList,
    isLoading: false,
    status: 'getCommuneListOk',
  })),
  on(_actions.setcommunelist, (_state, value) => {
    const searchCommune = (arr: Commune[], search: string) =>
      arr.filter((item) => item.communeName.toLocaleLowerCase().includes(search));
    return {
      ..._state,
      setCommuneList: searchCommune(_state.communeList, value.value.toLocaleLowerCase()),
      isLoading: false,
      status: 'setCommuneList',
    };
  }),

  on(_actions.error, (_state) => ({ ..._state, isLoading: false, status: 'error' })),
);

// ---------------------------------------------------------------------------------------------------------------------
@Injectable()
export class AddressFacade {
  select = createFeatureSelector<AddressState>(ADDRESS_FEATURE_KEY);
  isLoading$ = this.store.select(createSelector(this.select, (state) => state.isLoading));
  status$ = this.store.select(createSelector(this.select, (state) => state.status));

  constructor(private store: Store) {}

  provinceList$ = this.store.select(createSelector(this.select, (state) => state.setProvinceList));
  getProvinceList = (query: QueryFilter) => this.store.dispatch(_actions.getprovincelist(query));
  setProvinceList = (value: string) => this.store.dispatch(_actions.setprovincelist({ value }));

  districtList$ = this.store.select(createSelector(this.select, (state) => state.setDistrictList));
  getDistrictList = (query: QueryFilter) => this.store.dispatch(_actions.getdistrictlist(query));
  setDistrictList = (value: string) => this.store.dispatch(_actions.setdistrictlist({ value }));

  communeList$ = this.store.select(createSelector(this.select, (state) => state.setCommuneList));
  getCommuneList = (query: QueryFilter) => this.store.dispatch(_actions.getcommunelist(query));
  setCommuneList = (value: string) => this.store.dispatch(_actions.setcommunelist({ value }));
}

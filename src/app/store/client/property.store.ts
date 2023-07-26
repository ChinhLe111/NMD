import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination, QueryFilter, RequestApi } from '@model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
import { environment } from '@src/environments/environment';
import { emptyPagination, Message } from '@utils';
import { catchError, exhaustMap, map } from 'rxjs';
import { Attachment, User } from '@src/app/store';

export const PROPERTY_FEATURE_KEY = '40be0279-3b58-4dd6-a2e0-952ffb7cc25a';

// ---------------------------------------------------------------------------------------------------------------------
const _actions = createActionGroup({
  source: PROPERTY_FEATURE_KEY,
  events: {
    get: props<QueryFilter>(),
    'get ok': props<{ data: Property[] }>(),

    getPagination: props<QueryFilter>(),
    'getPagination ok': props<{ pagination: Pagination<Property> }>(),

    getById: props<{ id: string }>(),
    'getById ok': props<{ dataPagination: Property }>(),

    post: props<{ dataPagination: Property }>(),
    'post ok': props<{ dataPagination: Property }>(),

    put: props<{ id: string; dataPagination: Property }>(),
    'put ok': props<{ dataPagination: Property }>(),

    delete: props<{ id: string }>(),
    'delete ok': props<{ dataPagination: Property }>(),

    approve: props<{ id: string }>(),
    'approve ok': emptyProps(),

    'set id': props<{ id: string | null }>(),
    error: emptyProps(),
  },
});

// ---------------------------------------------------------------------------------------------------------------------
const url = `${environment.apiUrl}property`;

@Injectable()
export class PropertyEffects {
  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.get),
      exhaustMap(({ type, ...query }) => {
        const params = new HttpParams().appendAll(query);
        return this.httpClient.get<RequestApi<Pagination<Property>>>(`${url}`, { params }).pipe(
          map((res) =>
            _actions.getOk({
              data: res.data.content.map((p) => new Property(p)),
            }),
          ),
          catchError(async ({ error }) => this.error(error)),
        );
      }),
    ),
  );

  getPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.getpagination),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exhaustMap(({ type, ...query }) => {
        const params = new HttpParams().appendAll(query);
        return this.httpClient.get<RequestApi<Pagination<Property>>>(`${url}`, { params }).pipe(
          map((res) => _actions.getpaginationOk({ pagination: res.data })),
          catchError(async ({ error }) => this.error(error)),
        );
      }),
    ),
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.getbyid),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exhaustMap(({ type, id }) =>
        this.httpClient.get<RequestApi<Property>>(`${url}/${id}`).pipe(
          map((res) => _actions.getbyidOk({ dataPagination: res.data })),
          catchError(async ({ error }) => this.error(error)),
        ),
      ),
    ),
  );

  post$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.post),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exhaustMap(({ type, dataPagination }) =>
        this.httpClient.post<RequestApi<Property>>(`${url}`, dataPagination).pipe(
          map((res) => {
            this.message.success(res.message);
            return _actions.postOk({ dataPagination: res.data });
          }),
          catchError(async ({ error }) => this.error(error)),
        ),
      ),
    ),
  );

  put$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.put),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exhaustMap(({ type, id, dataPagination }) =>
        this.httpClient.put<RequestApi<Property>>(`${url}/${id}`, dataPagination).pipe(
          map((res) => {
            this.message.success(res.message);
            return _actions.putOk({ dataPagination: res.data });
          }),
          catchError(async ({ error }) => this.error(error)),
        ),
      ),
    ),
  );
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.delete),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exhaustMap(({ type, id }) =>
        this.httpClient.delete<RequestApi<Property>>(`${url}/${id}`).pipe(
          map((res) => {
            this.message.success(res.message);
            return _actions.deleteOk({ dataPagination: res.data });
          }),
          catchError(async ({ error }) => this.error(error)),
        ),
      ),
    ),
  );
  approve$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.approve),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exhaustMap(({ type, id }) => {
        const params = new HttpParams().append('id', id);
        return this.httpClient.put<RequestApi<Property>>(`${url}/approve/${id}`, '', { params }).pipe(
          map((res) => {
            this.message.success(res.message);
            return _actions.approveOk();
          }),
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
export interface CodeTypeList {
  title: string;
  code: string;
}

export interface PropertyUserConnection {
  isOwner?: boolean;
  isDraft?: boolean;
  isWaitConfirm?: boolean;
  hasBookmark?: boolean;
  hasUpdate?: boolean;
  allowTransaction?: boolean;
  allowedActions?: string[];
}
export class Property {
  id?: string;
  title?: string;
  description?: string;
  specificAddress?: string;
  provinceCode?: number;
  provinceName?: string;
  districtCode?: number;
  districtName?: string;
  communeCode?: number;
  communeName?: string;
  thumbnailUrl?: string;
  propertySourceCode?: string;
  propertySource?: CodeTypeList;
  propertySourceString?: string;
  transactionTypeCode?: string;
  propertyTypeCode?: string;
  propertyType?: CodeTypeList;
  propertyTypeString?: string;
  totalArea?: number;
  totalPrice?: number;
  currency?: string;
  totalRooms?: number;
  totalRestrooms?: number;
  totalFloors?: number;
  houseDirectionCode?: string;
  houseDirectionType?: CodeTypeList;
  houseDirectionString?: string;
  balconyDirectionCode?: string;
  balconyDirectionType?: CodeTypeList;
  balconyDirectionString?: string;
  facadeLength?: number;
  wayInLength?: number;
  interior?: string;
  positioning?: number[];
  statusCode?: string;
  hasAttachment?: boolean;
  createdByUserId?: string;
  createdOnDate?: string;
  realImageListUrl?: string[];
  virtualImageListUrl?: string[];
  documentsImageListUrl?: string[];
  view3DImageListUrl?: string[];
  videoListUrl?: string[];
  ccdvListUrl?: string[];
  ownerPhone?: string;
  propertyNo?: string;
  qrCode?: string;
  ownerName?: string;
  village?: string;
  currentUserConnectStatus?: PropertyUserConnection;
  unitPrice?: string;
  priceDisplayTypeCode?: string;
  priceDisplayType?: CodeTypeList;
  priceDisplayTypeString?: string;
  user?: User;
  hasSendZalo?: boolean;
  numberOfProperty?: number;
  lotNumber?: string;
  mapNumber?: string;
  allowTransaction?: boolean;
  attachments?: Attachment[];

  constructor(obj?: Partial<Property>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}

export interface PropertyState {
  pagination: Pagination<Property>;
  data?: Property[];
  dataPagination?: Property;
  query?: QueryFilter;
  id: string | null;
  isLoading: boolean;
  status:
    | 'idle'
    | 'get'
    | 'getOk'
    | 'error'
    | 'getPagination'
    | 'getPaginationOk'
    | 'getById'
    | 'getByIdOk'
    | 'post'
    | 'postOk'
    | 'put'
    | 'putOk'
    | 'delete'
    | 'deleteOk'
    | 'approve'
    | 'approveOk';
}

const initialState: PropertyState = {
  pagination: emptyPagination(),
  data: [],
  dataPagination: undefined,
  query: undefined,
  id: null,
  isLoading: false,
  status: 'idle',
};

export const propertyReducer = createReducer(
  initialState,
  on(_actions.get, (_state) => ({ ..._state, isLoading: true, status: 'get' })),
  on(_actions.getOk, (_state, data) => ({ ..._state, ...data, isLoading: false, status: 'getOk' })),

  on(_actions.getpagination, (_state, query) => ({ ..._state, isLoading: true, status: 'get', query })),
  on(_actions.getpaginationOk, (_state, pagination) => ({
    ..._state,
    ...pagination,
    isLoading: false,
    status: 'getOk',
  })),

  on(_actions.getbyid, (_state) => ({ ..._state, isLoading: true, status: 'getById' })),
  on(_actions.getbyidOk, (_state, data) => ({ ..._state, ...data, isLoading: false, status: 'getByIdOk' })),

  on(_actions.post, (_state) => ({ ..._state, isLoading: true, status: 'post' })),
  on(_actions.postOk, (_state, data) => ({ ..._state, ...data, isLoading: false, status: 'postOk' })),

  on(_actions.put, (_state) => ({ ..._state, isLoading: true, status: 'put' })),
  on(_actions.putOk, (_state, data) => ({ ..._state, ...data, isLoading: false, status: 'putOk' })),

  on(_actions.delete, (_state) => ({ ..._state, isLoading: true, status: 'delete' })),
  on(_actions.deleteOk, (_state, data) => ({ ..._state, ...data, isLoading: false, status: 'deleteOk' })),

  on(_actions.approve, (_state) => ({ ..._state, status: 'approve' })),
  on(_actions.approveOk, (_state) => ({ ..._state, status: 'approveOk' })),

  on(_actions.error, (_state) => ({ ..._state, isLoading: false, status: 'error' })),
);

// ---------------------------------------------------------------------------------------------------------------------
@Injectable()
export class PropertyFacade {
  select = createFeatureSelector<PropertyState>(PROPERTY_FEATURE_KEY);
  isLoading$ = this.store.select(createSelector(this.select, (state) => state.isLoading));
  status$ = this.store.select(createSelector(this.select, (state) => state.status));
  pagination$ = this.store.select(createSelector(this.select, (state) => state.pagination));
  query$ = this.store.select(createSelector(this.select, (state) => state.query));
  constructor(private store: Store) {}
  id$ = this.store.select(createSelector(this.select, (state) => state.id));
  setId = (id: string | null) => this.store.dispatch(_actions.setId({ id }));
  get$ = this.store.select(createSelector(this.select, (state) => state.data));
  get = (query: QueryFilter) => this.store.dispatch(_actions.get(query));

  getPagination = (query: QueryFilter) => this.store.dispatch(_actions.getpagination(query));
  data$ = this.store.select(createSelector(this.select, (state) => state.dataPagination));
  getById = (id: string) => this.store.dispatch(_actions.getbyid({ id }));
  post = (dataPagination: Property) => this.store.dispatch(_actions.post({ dataPagination }));
  put = (id: string, dataPagination: Property) => this.store.dispatch(_actions.put({ id, dataPagination }));
  delete = (id: string) => this.store.dispatch(_actions.delete({ id }));
  approve = (id: string) => this.store.dispatch(_actions.approve({ id }));
}

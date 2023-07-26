import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
import { catchError, exhaustMap, map } from 'rxjs';

import { Pagination, QueryFilter, RequestApi } from '@model';
import { environment } from '@src/environments/environment';
import { emptyPagination, Message } from '@utils';

export const CODE_TYPE_FEATURE_KEY = 'b7811ddc-d249-4b9a-99bd-1f5937f26ae6';
// ---------------------------------------------------------------------------------------------------------------------
const _actions = createActionGroup({
  source: CODE_TYPE_FEATURE_KEY,
  events: {
    getListGender: props<QueryFilter>(),
    'getListGender ok': props<{ listGender: Gender[] }>(),

    getPropertySource: props<QueryFilter>(),
    'getPropertySource ok': props<{ listPropertySource: Pagination<CodeType> }>(),

    getPropertyType: props<QueryFilter>(),
    'getPropertyType ok': props<{ listPropertyType: Pagination<CodeType> }>(),

    error: emptyProps(),
  },
});
// ---------------------------------------------------------------------------------------------------------------------
const url = `${environment.apiUrl}code-type`;

@Injectable()
export class CodeTypeEffects {
  getListGender$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.getlistgender),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exhaustMap(({ type, ...query }) => {
        const params = new HttpParams().appendAll(query);
        return this.httpClient.get<RequestApi<Pagination<Gender>>>(`${url}/gender`, { params }).pipe(
          map((res) =>
            _actions.getlistgenderOk({
              listGender: res.data.content.map((item) => ({ ...item, value: item.code, label: item.title })),
            }),
          ),
          catchError(async ({ error }) => this.error(error)),
        );
      }),
    ),
  );
  getPropertySource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.getpropertysource),
      exhaustMap(({ type, ...query }) => {
        const params = new HttpParams().appendAll(query);
        return this.httpClient.get<RequestApi<Pagination<CodeType>>>(`${url}`, { params }).pipe(
          map((res) => _actions.getpropertysourceOk({ listPropertySource: res.data })),
          catchError(async ({ error }) => this.error(error)),
        );
      }),
    ),
  );
  getPropertyType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.getpropertytype),
      exhaustMap(({ type, ...query }) => {
        const params = new HttpParams().appendAll(query);
        return this.httpClient.get<RequestApi<Pagination<CodeType>>>(`${url}`, { params }).pipe(
          map((res) => _actions.getpropertytypeOk({ listPropertyType: res.data })),
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
export interface Gender {
  code: string;
  title: string;
  value: string;
  label: string;
}

export interface CodeTypeTranslation {
  title: string;
  description: string;
  language: string;
}

export interface CodeType {
  id: string;
  title: string;
  code: string;
  order: number;
  description: string;
  type: string;
  translations: CodeTypeTranslation[];
  createdOnDate: string;
  lastModifiedOnDate: string;
}

export interface CodeTypeState {
  isLoading: boolean;
  listGender: Gender[];
  listPropertySource: Pagination<CodeType>;
  listPropertyType: Pagination<CodeType>;
  status:
    | 'idle'
    | 'get'
    | 'getOk'
    | 'getListGender'
    | 'getListGenderOK'
    | 'getPropertySource'
    | 'getPropertySourceOk'
    | 'getPropertyType'
    | 'getPropertyTypeOk'
    | 'error';
}

const initialState: CodeTypeState = {
  listGender: [],
  listPropertySource: emptyPagination(),
  listPropertyType: emptyPagination(),
  isLoading: false,
  status: 'idle',
};

export const codeTypeReducer = createReducer(
  initialState,

  on(_actions.getlistgender, (_state) => ({ ..._state, isLoading: true, status: 'getListGender' })),
  on(_actions.getlistgenderOk, (_state, listGender) => ({
    ..._state,
    ...listGender,
    isLoading: false,
    status: 'getListGenderOK',
  })),

  on(_actions.getpropertysource, (_state) => ({ ..._state, isLoading: true, status: 'getPropertySource' })),
  on(_actions.getpropertysourceOk, (_state, list) => ({
    ..._state,
    ...list,
    isLoading: false,
    status: 'getPropertySourceOk',
  })),

  on(_actions.getpropertytype, (_state) => ({ ..._state, isLoading: true, status: 'getPropertyType' })),
  on(_actions.getpropertytypeOk, (_state, list) => ({
    ..._state,
    ...list,
    isLoading: false,
    status: 'getPropertyTypeOk',
  })),

  on(_actions.error, (_state) => ({ ..._state, isLoading: false, status: 'error' })),
);

// ---------------------------------------------------------------------------------------------------------------------
@Injectable()
export class CodeTypeFacade {
  select = createFeatureSelector<CodeTypeState>(CODE_TYPE_FEATURE_KEY);
  isLoading$ = this.store.select(createSelector(this.select, (state) => state.isLoading));
  status$ = this.store.select(createSelector(this.select, (state) => state.status));

  constructor(private store: Store) {}

  getListGender$ = this.store.select(createSelector(this.select, (state) => state.listGender));
  getListGender = (query: QueryFilter) => this.store.dispatch(_actions.getlistgender(query));

  listPropertySource$ = this.store.select(createSelector(this.select, (state) => state.listPropertySource));
  getPropertySource = (query: QueryFilter) => this.store.dispatch(_actions.getpropertysource(query));

  listPropertyType$ = this.store.select(createSelector(this.select, (state) => state.listPropertyType));
  getPropertyType = (query: QueryFilter) => this.store.dispatch(_actions.getpropertytype(query));
}

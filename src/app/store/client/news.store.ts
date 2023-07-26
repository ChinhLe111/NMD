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
import { User } from '@store';
import { emptyPagination, Message } from '@utils';
import { catchError, exhaustMap, map } from 'rxjs';

export const NEWS_FEATURE_KEY = 'fa6d6902-1d4b-45d9-8122-2e9a8adcc3a0';

// ---------------------------------------------------------------------------------------------------------------------
const _actions = createActionGroup({
  source: NEWS_FEATURE_KEY,
  events: {
    get: props<QueryFilter>(),
    'get ok': props<{ dataPagination: News[] }>(),

    getPagination: props<QueryFilter>(),
    'getPagination ok': props<{ pagination: Pagination<News> }>(),

    getById: props<{ id: string }>(),
    'getById ok': props<{ data: News }>(),

    post: props<{ data: News }>(),
    'post ok': props<{ data: News }>(),

    put: props<{ id: string; data: News }>(),
    'put ok': props<{ data: News }>(),

    delete: props<{ id: string }>(),
    'delete ok': props<{ data: News }>(),

    approve: props<{ id: string; statusCode: string }>(),
    'approve ok': props<{ data: News }>(),

    error: emptyProps(),
  },
});

// ---------------------------------------------------------------------------------------------------------------------
const url = `${environment.apiUrl}news`;

@Injectable()
export class NewsEffects {
  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.get),
      exhaustMap(({ type, ...query }) => {
        const params = new HttpParams().appendAll(query);
        return this.httpClient.get<RequestApi<Pagination<News>>>(`${url}`, { params }).pipe(
          map((res) =>
            _actions.getOk({
              dataPagination: res.data.content.map((p) => new News(p)),
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
        return this.httpClient.get<RequestApi<Pagination<News>>>(`${url}`, { params }).pipe(
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
        this.httpClient.get<RequestApi<News>>(`${url}/${id}`).pipe(
          map((res) => _actions.getbyidOk({ data: res.data })),
          catchError(async ({ error }) => this.error(error)),
        ),
      ),
    ),
  );

  post$ = createEffect(() =>
    this.actions$.pipe(
      ofType(_actions.post),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exhaustMap(({ type, data }) =>
        this.httpClient.post<RequestApi<News>>(`${url}`, data).pipe(
          map((res) => {
            this.message.success(res.message);
            return _actions.postOk({ data: res.data });
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
      exhaustMap(({ type, id, data }) =>
        this.httpClient.put<RequestApi<News>>(`${url}/${id}`, data).pipe(
          map((res) => {
            this.message.success(res.message);
            return _actions.putOk({ data: res.data });
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
        this.httpClient.delete<RequestApi<News>>(`${url}/${id}`).pipe(
          map((res) => {
            this.message.success(res.message);
            return _actions.deleteOk({ data: res.data });
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
      exhaustMap(({ type, id, statusCode }) =>
        this.httpClient.put<RequestApi<News>>(`${url}/change-status/${id}`, { statusCode: statusCode }).pipe(
          map((res) => {
            this.message.success(res.message);
            return _actions.approveOk({ data: res.data });
          }),
          catchError(async ({ error }) => this.error(error)),
        ),
      ),
    ),
  );
  // approve$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(_actions.approve),
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     exhaustMap(({ type, id, statusCode }) =>
  //       this.httpClient.put<RequestApi<News>>(`${url}/change-status/${id}`, statusCode).pipe(
  //         map((res) => {
  //           this.message.success(res.message);
  //           return _actions.putOk({ data: res.data });
  //         }),
  //         catchError(async ({ error }) => this.error(error)),
  //       ),
  //     ),
  //   ),
  // );

  constructor(private actions$: Actions, private message: Message, private httpClient: HttpClient) {}

  error = (error: RequestApi) => {
    if (error.message) this.message.error(error.message);
    return _actions.error();
  };
}

// ---------------------------------------------------------------------------------------------------------------------
export class News {
  id?: string;
  ownerName?: string;
  ownerPhone?: string;
  specificAddress?: string;
  provinceCode?: number;
  districtCode?: number;
  communeCode?: number;
  village?: string;
  districtName?: string;
  communeName?: string;
  provinceName?: string;
  positioning?: number[];
  statusCode?: string;
  reason?: string;
  lotNumber?: string;
  mapNumber?: string;
  title?: string;
  description?: string;
  createdOnDate?: string;
  user?: User;

  constructor(obj?: Partial<News>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}

export interface NewsState {
  pagination: Pagination<News>;
  data?: News;
  dataPagination?: News[];
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

const initialState: NewsState = {
  pagination: emptyPagination(),
  data: undefined,
  query: undefined,
  id: null,
  isLoading: false,
  status: 'idle',
};

export const newsReducer = createReducer(
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

  on(_actions.error, (_state) => ({ ..._state, isLoading: false, status: 'error' })),
  on(_actions.put, (_state) => ({ ..._state, isLoading: true, status: 'put' })),
  on(_actions.putOk, (_state, data) => ({
    ..._state,
    ...data,
    isLoading: false,
    status: 'putOk',
  })),
  on(_actions.delete, (_state) => ({ ..._state, isLoading: true, status: 'delete' })),
  on(_actions.deleteOk, (_state, data) => ({
    ..._state,
    ...data,
    isLoading: false,
    status: 'deleteOk',
  })),

  on(_actions.approve, (_state) => ({ ..._state, status: 'approve' })),
  on(_actions.approveOk, (_state) => ({ ..._state, status: 'approveOk' })),
);

// ---------------------------------------------------------------------------------------------------------------------
@Injectable()
export class NewsFacade {
  select = createFeatureSelector<NewsState>(NEWS_FEATURE_KEY);
  isLoading$ = this.store.select(createSelector(this.select, (state) => state.isLoading));
  status$ = this.store.select(createSelector(this.select, (state) => state.status));
  pagination$ = this.store.select(createSelector(this.select, (state) => state.pagination));
  query$ = this.store.select(createSelector(this.select, (state) => state.query));
  get = (query: QueryFilter) => this.store.dispatch(_actions.get(query));

  constructor(private store: Store) {}

  get$ = this.store.select(createSelector(this.select, (state) => state.data));
  data$ = this.store.select(createSelector(this.select, (state) => state.data));
  post = (data: News) => this.store.dispatch(_actions.post({ data }));
  getPagination = (query: QueryFilter) => this.store.dispatch(_actions.getpagination(query));
  getById = (id: string) => this.store.dispatch(_actions.getbyid({ id }));
  put = (id: string, data: News) => this.store.dispatch(_actions.put({ id, data }));
  delete = (id: string) => this.store.dispatch(_actions.delete({ id }));
  approve = (id: string, statusCode: string) => this.store.dispatch(_actions.approve({ id, statusCode }));
}

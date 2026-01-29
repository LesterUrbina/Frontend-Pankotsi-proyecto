export interface ApiResponse<T> {
  mensaje: string;
  data: T;
  fecha: string;
  //dateTime: string;
}

export interface ApiResponseError {
  fecha: string;
  titulo: string;
  descripcion: string;
}

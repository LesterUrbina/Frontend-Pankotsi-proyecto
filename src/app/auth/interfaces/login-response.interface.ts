// interfaces/login-response.interface.ts
export interface LoginResponse {
  mensaje: string;
  data: UserData;
  fecha: string;
}

export interface UserData {
  idUsuario: number;
  nroCelular: string;
  token: string;
  expiracionToken: string;
  roles: string[];
  nombres: string;
  correo: string;
}


export interface ErrorResponse {
  fecha: string;
  titulo: string;
  descripcion: string;
}

export interface LoginRequest {
  nroCelular: string;
  clave: string;
}
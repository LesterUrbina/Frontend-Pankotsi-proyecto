import { RoleRouteKey } from "src/app/core/models/roles";

export interface Usuario {
  idUsuario: number;
  nombres: string;
  apellidos: string;
  correo: string;
  clave?: string;
  nroCelular: string;
  usuarioRoles?: any[];
  alumnos?: any[];
  observaciones?: [],
  usuarioCursos?: [],
  usuarioSalones?: []
}

export interface UsuarioAuth {
  idUsuario: number;
  nroCelular: string;
  token: string;
  expiracionToken: string;
  roles: RoleRouteKey[];
  nombres: string;
  correo: string;
}

export interface DataStorage {
  token: string;
  expiracionToken: string;
  roles: string[];
}


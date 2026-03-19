export interface CustomJWTSessionClaims{
	medtadata?:{
		role?: "user" | "admin";
	}
}
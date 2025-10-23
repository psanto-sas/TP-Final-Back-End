import { verifyToken } from "../utils/verifyToken.js";

export const verifyTokenMW = (request, response, next) => {
    try {
        const authorizationHeader = request.headers.authorization;
        console.log(authorizationHeader);
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
          return response.status(400).json({ message: "Token no proporcionado"}) 
        };
        
        const token = authorizationHeader.split(" ")[1];

        const decoded = verifyToken(token);
        console.log(decoded);

        request.user = decoded

        next()
    } catch (error) {
      return response.status(400).json({ message: "Token de acceso invalido", error: error.message })
    }
}
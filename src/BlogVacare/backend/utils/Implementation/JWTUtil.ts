import jwt, { SignOptions } from 'jsonwebtoken';
import { I_JWTUtil } from "@BlogsBack/utils/Interface/I_JWTUtil";
import { JwtPayload } from "@BlogsShared/model/Auth";
import type { StringValue } from 'ms';

export class JWTUtil implements I_JWTUtil {

    private readonly TOKEN_ACCES : string;
    private readonly TOKEN_REFRESH : string;
    private readonly TOKEN_ACCES_EXPIRATION : StringValue;
    private readonly TOKEN_REFRESH_EXPIRATION : StringValue;

    /**
     * Constructeur initialisant les variables d'environnement
     */
    public constructor() {
        if (!process.env.JWT_TOKEN_ACCES || !process.env.JWT_TOKEN_REFRESH || !process.env.JWT_TOKEN_ACCES_EXPIRATION || !process.env.JWT_TOKEN_REFRESH_EXPIRATION) {
            throw new Error("Les variables d'environnement JWT ne sont pas initialisées");
        }
        
        this.TOKEN_ACCES = process.env.JWT_TOKEN_ACCES.toString();
        this.TOKEN_REFRESH = process.env.JWT_TOKEN_REFRESH.toString();
        this.TOKEN_ACCES_EXPIRATION = process.env.JWT_TOKEN_ACCES_EXPIRATION as StringValue;
        this.TOKEN_REFRESH_EXPIRATION = process.env.JWT_TOKEN_REFRESH_EXPIRATION as StringValue;
    }

    genererTokenAcces(payload : JwtPayload) : string {
        return jwt.sign(payload, this.TOKEN_ACCES, { expiresIn : this.TOKEN_ACCES_EXPIRATION });
    }

    genererRefreshToken(payload : JwtPayload) : string {
        return jwt.sign(payload, this.TOKEN_REFRESH, { expiresIn : this.TOKEN_REFRESH_EXPIRATION });
    }

    verifierTokenAcces(token : string) : JwtPayload {
        try {
            return jwt.verify(token, this.TOKEN_ACCES) as JwtPayload;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('Token expiré');
            }
            
            throw new Error('Token invalide');
        }
    }

    verifierTokenRefresh(token : string) : JwtPayload {
        try {
            return jwt.verify(token, this.TOKEN_REFRESH) as JwtPayload;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('Token expiré');
            }
            
            throw new Error('Token invalide');
        }
    }

}
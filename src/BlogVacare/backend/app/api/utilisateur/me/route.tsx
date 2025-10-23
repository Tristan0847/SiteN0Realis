import { NextRequest, NextResponse } from 'next/server';
import { I_AuthService } from '@BlogsBack/service/interface/I_AuthService';
import { INTERFACESSERVICE, ServiceFactory } from '@BlogsBack/service/ServiceFactory';

const service : I_AuthService = ServiceFactory.get<I_AuthService>(INTERFACESSERVICE.I_AuthService);

/**
 * Requête de récupération de l'utilisateur actuel à partir du JWT s'il en a un
 * @param request Requête envoyée
 * @returns Nom de l'utilisateur et son rôle
 */
export async function GET(request: NextRequest) {
  try {
    // On récupère le token depuis les cookies
    const tokenAcces = request.cookies.get('tokenAcces')?.value;
    
    if (!tokenAcces) {
      return NextResponse.json(
        { error: 'Vousn n\'êtes pas authentifié, veuillez vous connecter.' },
        { status: 401 }
      );
    }

    const payload = await service.verifierToken(tokenAcces);

    // Retourne les infos utilisateur
    return NextResponse.json({
      username: payload.username,
      estAdmin: payload.estAdmin
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Token invalide ou expiré' },
      { status: 401 }
    );
  }
}

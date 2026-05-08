<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * @property string $nom_utilisateur Nom d'utilisateur
 * @property string $mot_de_passe Mot de passe
 * @property boolean $est_admin Rôle de l'utilisateur
 * @property string $created_at Date de création de l'utilisateur
 * @property string $updated_at Date de mise à jour de l'utilisateur
 */
class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $table = 'utilisateurs';
    // Gestion PK
    protected $primaryKey = "nom_utilisateur";
    public $incrementing = false;

    protected $hidden = ['mot_de_passe'];
    protected $visible = ["nom_utilisateur", "est_admin", "created_at", "updated_at"];
    protected $guarded = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'mot_de_passe' => 'hashed',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }
}

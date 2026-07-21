<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Override;

/**
 * Classe représentant les caractéristiques d'un élément supprimé
 * @property int $id Identifiant de l'élément
 * @property string $nom_utilisateur Nom de l'utilisateur supprimant l'élément
 * @property string $raison_suppression Raison de la suppression
 * @property string $date_suppression Date de la suppression
 * @property boolean $cache Si l'élément supprimé doit être caché (true) ou non (false)
 */
class ElementSupprime extends Model
{
    /** @use HasFactory<\Database\Factories\ElementSupprimeFactory> */
    use HasFactory;

    protected $table = 'elements_supprimes';

    public const CREATED_AT = "date_suppression";
    public const UPDATED_AT = null;

    protected $guarded = [];

    /**
     * Liaison à la table utilisateurs
     * @return BelongsTo<User,$this>
     */
    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'nom_utilisateur', 'nom_utilisateur');
    }
}

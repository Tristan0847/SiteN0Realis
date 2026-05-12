<?php

namespace App\Models;

use Database\Factories\DossierFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Classe représentant un dossier
 * @property int $id Identifiant du dossier
 * @property string $titre Nom du dossier
 * @property string $description Description du dossier
 * @property string $slug Slug du dossier
 * @property string $nom_utilisateur Nom de l'utilisateur ayant créé le dossier
 * @property int|null $id_suppression ID de l'élément supprimé s'il y en a un
 * @property string $date_creation Date de création du dossier
 */
class Dossier extends Model
{
    /** @use HasFactory<DossierFactory> */
    use HasFactory;

    protected $table = "dossiers";
    public const CREATED_AT = "date_creation";
    public const UPDATED_AT = null;

    protected $guarded = [];

    /**
     * Liaison à l'utilisateur ayant créé le dossier
     * @return BelongsTo<User,$this>
     */
    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'nom_utilisateur', 'nom_utilisateur');
    }

    /**
     * Liaison désignant les blogs liés à un dossier
     * @return HasMany<Blog,$this>
     */
    public function blogs(): HasMany
    {
        return $this->hasMany(Blog::class, 'id_dossier', 'id');
    }

    /**
     * Liaison à l'élément supprimé lié s'il y en a un
     * @return BelongsTo<ElementSupprime,$this>
     */
    public function elementSupprime(): BelongsTo
    {
        return $this->belongsTo(ElementSupprime::class, 'id_suppression', 'id');
    }

    /**
     * Liaison à la table Element supprimé qui ne serait pas caché
     * @return BelongsTo<ElementSupprime,$this>
     */
    public function elementSupprimeVisible(): BelongsTo
    {
        return $this->belongsTo(ElementSupprime::class, 'id_suppression')
            ->where('cache', false);
    }
}

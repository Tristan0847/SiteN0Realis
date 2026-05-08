<?php

namespace App\Models;

use Database\Factories\BlogFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Classe représentant un blog
 * @property int $id Identifiant du blog
 * @property string $titre Titre du blog
 * @property string $slug Slug du blog
 * @property int|null $id_dossier ID du dossier contenant le blog s'il y en a un
 * @property string $nom_utilisateur Nom de l'utilisateur ayant créé le blog
 * @property string|null $id_suppression ID de suppression de l'élément s'il y en a un
 * @property string $date_creation Date de création du blog
 */
class Blog extends Model
{
    /** @use HasFactory<BlogFactory> */
    use HasFactory;

    protected $table = 'blogs';
    public const CREATED_AT = "date_creation";
    public const UPDATED_AT = null;

    protected $guarded = [];

    /**
     * Liaison au dossier éventuel contenant le blog
     * @return BelongsTo<Dossier,$this>
     */
    public function dossier()
    {
        return $this->belongsTo(Dossier::class, 'id_dossier', 'id');
    }

    /**
     * Liaison à la table messages
     * @return HasMany<Message,$this>
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'id_blog', 'id');
    }

    /**
     * Sélection du premier message d'un blog
     * @return HasOne<Message,$this>
     */
    public function premierMessage(): HasOne
    {
        return $this->messages()
            ->one()
            ->ofMany(["date_publication" => "min"], function (Builder $query) {
                $query->whereNull('id_suppression');
            });
    }

    /**
     * Liaison à l'utilisateur ayant créé le blog
     * @return BelongsTo<User,$this>
     */
    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'nom_utilisateur', 'nom_utilisateur');
    }

    /**
     * Liaison à l'élément supprimé s'il y en a un
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

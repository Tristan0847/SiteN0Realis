<?php

namespace App\Models;

use Database\Factories\MessageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Termwind\Components\Element;

/**
 * Classe représentant un message du blog
 * @property int $id Identifiant du message
 * @property int $id_blog Identifiant du blog lié
 * @property string $nom_utilisateur Nom de l'utilisateur ayant créé le message
 * @property string $contenu Contenu du message
 * @property string $date_publication Date de création du message
 * @property int|null $id_suppression ID de l'élément supprimé s'il y en a un
 */
class Message extends Model
{
    /** @use HasFactory<MessageFactory> */
    use HasFactory;

    protected $table = 'messages';

    public const CREATED_AT = "date_publication";
    public const UPDATED_AT = null;

    protected $guarded = [];

    /**
     * Liaison à l'utilisateur créant le message
     * @return BelongsTo<User,$this>
     */
    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, "nom_utilisateur", "nom_utilisateur");
    }

    /**
     * Liaison au blog contenant le messaeg
     * @return BelongsTo<Blog,$this>
     */
    public function blog(): BelongsTo
    {
        return $this->belongsTo(Blog::class, "id_blog", "id");
    }

    /**
     * Liaison à l'élément supprimé s'il y en a un
     * @return BelongsTo<ElementSupprime,$this>
     */
    public function elementSupprime(): BelongsTo
    {
        return $this->belongsTo(ElementSupprime::class, "id_suppression", "id");
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

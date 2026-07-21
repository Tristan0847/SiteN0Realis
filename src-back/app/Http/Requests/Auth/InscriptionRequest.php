<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class InscriptionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "login" => ["required", "string", "min:3", "max:255", Rule::unique(User::class, "nom_utilisateur")],
            // Validation mot de passe
            "mdp1" => ["required", "string", Password::min(8)->mixedCase()->symbols()->numbers()->letters()],
            "mdp2" => ["required", "string", "same:mdp1"]
        ];
    }
}

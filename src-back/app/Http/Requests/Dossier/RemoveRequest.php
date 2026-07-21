<?php

namespace App\Http\Requests\Dossier;

use App\Models\Dossier;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RemoveRequest extends FormRequest
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
            "id_dossier" => ["required", "integer", Rule::exists(Dossier::class, "id")],
            "raison" => ["nullable", "string"],
            "cache" => ["nullable", "boolean"],
        ];
    }
}

<?php

namespace App\Http\Requests\Messages;

use App\Models\Blog;
use App\Models\Dossier;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
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
            "slug_dossier" => ["required", "string", Rule::exists(Dossier::class, "slug")],
            "slug_blog" => ["required", "string", Rule::exists(Blog::class, "slug")],
            "contenu" => ["required", "string"]
        ];
    }
}

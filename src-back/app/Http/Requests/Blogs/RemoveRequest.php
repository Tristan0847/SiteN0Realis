<?php

namespace App\Http\Requests\Blogs;

use App\Models\Blog;
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
            "id_blog" => ["required", "integer", Rule::exists(Blog::class, "id")],
            "raison" => ["nullable", "string"],
            "cache" => ["nullable", "boolean"],
        ];
    }
}

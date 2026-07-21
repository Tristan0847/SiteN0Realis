<?php

namespace App\Http\Requests\Messages;

use App\Models\Message;
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
            "id_message" => ["required", "int", Rule::exists(Message::class, "id")],
            "raison" => ["nullable", "string"],
            "cache" => ["nullable", "boolean"],
        ];
    }
}

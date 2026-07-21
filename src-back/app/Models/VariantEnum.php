<?php

namespace App\Models;

/**
 * Enumération des variantes du site
 */
enum VariantEnum: string
{
    case OLD = "old";
    case MODERN = "modern";
    case ADMIN = "admin";
}

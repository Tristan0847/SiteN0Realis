<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('elements_supprimes', function (Blueprint $table) {
            $table->id();
            $table->string('nom_utilisateur');
            $table->foreign('nom_utilisateur')->references('nom_utilisateur')->on('utilisateurs')->onDelete('cascade');
            $table->text('raison_suppression');
            $table->dateTime('date_suppression')->default(date('Y-m-d H:i:s'));
            $table->boolean('cache')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('elements_supprimes');
    }
};

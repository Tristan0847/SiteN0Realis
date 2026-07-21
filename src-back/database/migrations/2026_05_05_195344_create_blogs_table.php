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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('slug')->unique();
            $table->unsignedBigInteger('id_dossier')->nullable();
            $table->foreign('id_dossier')->references('id')->on('dossiers')->onDelete('set null');
            $table->string('nom_utilisateur');
            $table->foreign('nom_utilisateur')->references('nom_utilisateur')->on('utilisateurs')->onDelete('cascade');
            $table->unsignedBigInteger('id_suppression')->nullable();
            $table->foreign('id_suppression')->references('id')->on('elements_supprimes')->onDelete('set null');
            $table->dateTime('date_creation')->default(date('Y-m-d H:i:s'));
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};

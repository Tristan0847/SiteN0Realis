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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_blog');
            $table->foreign('id_blog')->references('id')->on('blogs')->onDelete('cascade');
            $table->string('nom_utilisateur');
            $table->foreign('nom_utilisateur')->references('nom_utilisateur')->on('utilisateurs')->onDelete('cascade');
            $table->text('contenu');
            $table->dateTime('date_publication')->default(date('Y-m-d H:i:s'));
            $table->unsignedBigInteger('id_suppression')->nullable();
            $table->foreign('id_suppression')->references('id')->on('elements_supprimes')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};

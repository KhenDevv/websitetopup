<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_database_check_endpoint_returns_connected_status(): void
    {
        $response = $this->getJson('/api/db-check');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'connected',
            ]);
    }

    public function test_user_can_register_via_api(): void
    {
        $response = $this->postJson('/api/register', [
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['message', 'user', 'token']);

        $this->assertDatabaseHas('users', [
            'username' => 'testuser',
            'email' => 'test@example.com',
        ]);
    }

    public function test_user_can_login_with_username_or_email(): void
    {
        $user = User::create([
            'name' => 'Demo User',
            'username' => 'demouser',
            'email' => 'demo@example.com',
            'password' => bcrypt('secret123'),
        ]);

        // Login with username
        $response = $this->postJson('/api/login', [
            'login' => 'demouser',
            'password' => 'secret123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['token', 'user']);

        // Login with email
        $responseEmail = $this->postJson('/api/login', [
            'login' => 'demo@example.com',
            'password' => 'secret123',
        ]);

        $responseEmail->assertStatus(200);
    }
}

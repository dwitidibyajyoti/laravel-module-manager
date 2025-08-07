<?php

namespace Modules\FormSubmit\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FormSubmit extends Model
{
    use HasFactory;

    protected $table = 'form_submit'; // optional if table name matches

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company_name',
    ];
}

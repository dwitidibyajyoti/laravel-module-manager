<?php

namespace Modules\FormSubmit\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\FormSubmit\Models\FormSubmit;

class FormSubmitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $submissions = FormSubmit::latest()->get(); // you can paginate if needed

        return view('formsubmit::index', compact('submissions'));
        // return view('formsubmit::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return view('formsubmit::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd('store method hit!', $request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'company_name' => 'required|string|max:255',
        ]);

        // Save to DB
        FormSubmit::create($validated);

        // Redirect back with success message
        return redirect()->route('formsubmit.create')->with('success', 'Form submitted successfully!');
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('formsubmit::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('formsubmit::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {}
}

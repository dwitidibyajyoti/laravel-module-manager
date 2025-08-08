<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use ZipArchive;
use Illuminate\Support\Str;
use Nwidart\Modules\Facades\Module;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;

class ModuleUploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'module' => 'required|file|mimes:zip',
        ]);

        $file = $request->file('module');
        $zip = new ZipArchive;
        if ($zip->open($file->getRealPath()) === true) {
            // $moduleName = Str::before($file->getClientOriginalName(), '.zip');

            for ($i = 0; $i < $zip->numFiles; $i++) {
                $stat = $zip->statIndex($i);
                $filename = $stat['name'];

                if (Str::endsWith($filename, 'module.json')) {
                    $moduleFolder = explode('/', $filename)[0]; // root folder name
                    $isValidModule = true;
                    break;
                }
            }

            if (! $isValidModule) {
                $zip->close();
                return response()->json(['success' => false, 'message' => 'Not a valid Laravel module.'], 400);
            }
            $extractPath = base_path("Modules");
            if (!file_exists($extractPath)) {
                mkdir($extractPath, 0755, true);
            }

            $zip->extractTo($extractPath);
            $zip->close();
            return response()->json(['success' => true, 'message' => 'Module uploaded and extracted successfully.']);
        }

        return response()->json(['success' => false, 'message' => 'Failed to upload module.'], 500);
    }

    public function index()
    {
        $modules = [];

        foreach (Module::all() as $module) {
            $name = $module->getName();
            $path = $module->getPath();

            // $hasMigrations = File::isDirectory("$path/Database/Migrations") &&
            //     count(File::files("$path/Database/Migrations")) > 0;

            $modules[] = [
                'name' => $name,
                'enabled' => $module->isEnabled(),
                'has_migrations' => true, // $hasMigrations,
            ];
        }

        return response()->json($modules);
    }
    public function enable($name)
    {
        $module = Module::findOrFail($name);
        $module->enable();
        return response()->json(['success' => true, 'message' => "$name enabled"]);
    }

    public function disable($name)
    {
        $module = Module::findOrFail($name);
        $module->disable();
        return response()->json(['success' => true, 'message' => "$name disabled"]);
    }

    public function destroy($name)
    {
        $module = Module::findOrFail($name);
        $path = $module->getPath();

        // Disable before delete (optional)
        $module->disable();

        File::deleteDirectory($path);

        return response()->json(['success' => true, 'message' => "$name deleted"]);
    }
    public function migrate($name)
    {
        try {
            Artisan::call("module:migrate", [
                'module' => $name,
                '--force' => true,
            ]);

            return response()->json([
                'success' => true,
                'message' => "Migration run for module: $name"
            ]);
        } catch (\Exception $e) {
            Log::error("Migration failed for module $name: " . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => "Migration failed for module: $name"
            ], 500);
        }
    }
}

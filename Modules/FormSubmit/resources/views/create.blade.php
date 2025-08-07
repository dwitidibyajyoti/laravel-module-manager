<!DOCTYPE html>
<html lang="en">


@if (session('success'))
    <div style="color: green; padding: 10px; border: 1px solid green; margin-bottom: 10px;">
        {{ session('success') }}
    </div>
@endif

<head>
    <meta charset="UTF-8">
    <title>Submit Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f7f8;
            padding: 40px;
        }

        .form-container {
            background-color: #fff;
            max-width: 500px;
            margin: 0 auto;
            padding: 30px 40px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            text-align: center;
            margin-bottom: 25px;
            color: #333;
        }

        label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
            color: #555;
        }

        input[type="text"],
        input[type="email"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: #4CAF50;
            border: none;
            color: white;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }
    </style>
</head>

<body>

    <div class="form-container">
        <h2>Submit Your Details</h2>

        <form method="POST" action="{{ route('formsubmit.store') }}">
            @csrf

            <label>Name</label>
            <input type="text" name="name" required>

            <label>Email</label>
            <input type="email" name="email" required>

            <label>Phone</label>
            <input type="text" name="phone" required>

            <label>Company Name</label>
            <input type="text" name="company_name" required>

            <button type="submit">Submit</button>
        </form>
    </div>

</body>

</html>

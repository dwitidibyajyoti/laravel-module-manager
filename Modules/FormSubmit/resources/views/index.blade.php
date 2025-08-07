<x-formsubmit::layouts.master>
    <h1>All Submitted Forms</h1>

    @if (session('success'))
        <div style="padding: 10px; background-color: #d4edda; color: #155724; margin-bottom: 15px; border-radius: 5px;">
            {{ session('success') }}
        </div>
    @endif

    <div style="margin-bottom: 20px;">
        <a href="{{ route('formsubmit.create') }}"
            style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">+
            Create New Submission</a>
    </div>

    @if ($submissions->isEmpty())
        <p>No submissions found.</p>
    @else
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="padding: 10px; border: 1px solid #ddd;">ID</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Name</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Email</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Phone</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Company Name</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Submitted At</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($submissions as $submission)
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">{{ $submission->id }}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{{ $submission->name }}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{{ $submission->email }}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{{ $submission->phone }}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{{ $submission->company_name }}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">
                            {{ $submission->created_at->format('Y-m-d H:i') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif
</x-formsubmit::layouts.master>

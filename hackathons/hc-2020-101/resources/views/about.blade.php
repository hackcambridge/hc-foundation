@extends('layouts.base')

@section('title', 'Page Title')

@section('content')
    <strong>{{ Auth::user()->type  }}</strong><br>
    <strong>{{ Auth::user()->sub  }}</strong><br>
@endsection

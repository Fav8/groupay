import 'dart:developer';

import 'package:firebase_auth/firebase_auth.dart';

class AuthenticationService {
  final FirebaseAuth _firebaseAuth;
  AuthenticationService(this._firebaseAuth);

  Stream<User?> get authStateChanges => _firebaseAuth.authStateChanges();

  Future<String> logIn({String email = '', String password = ''}) async {
    try {
      await _firebaseAuth.signInWithEmailAndPassword(
          email: email, password: password);
      return 'Logged In';
    } on FirebaseAuth catch (e) {
      return e.toString();
    }
  }

  Future<String> signUp({String email = '', String password = ''}) async {
    try {
      await _firebaseAuth.createUserWithEmailAndPassword(
          email: email, password: password);
      return 'Signed Up';
    } on FirebaseAuth catch (e) {
      return e.toString();
    }
  }
}

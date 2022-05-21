interface AdhaarFormData {
  first_name: string;
  last_name: string;
  blood_type: string;
  dob: string;
  address: string;
  photograph: File;
  is_fake: boolean;
}

interface SignChallenge {
  id: number;
  content: string;
  signature: string;
  pubKey: string;
}

interface AdhaarRequest {
  id: number;
  sign_challenge: SignChallenge;
  first_name: string;
  last_name: string;
  blood_type: string;
  dob: string;
  address: string;
  photograph: string;
  created_at: string;
}

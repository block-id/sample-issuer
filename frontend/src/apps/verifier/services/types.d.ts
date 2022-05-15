interface VerifierRequest {
  id: number;
  id_type: string;
  attribute_groups: string[];
  entropy: string;
}

interface VerifierRequestWalletPayload {
  idType: string;
  attributeGroups: string[];
  requesterName: string;
  sendTo: string;
  entropy: string;
}

interface VerifiablePresentation {
  data: {
    id: VerifiableId['data'];
    entropy: string;
  };
  signature: string;
}

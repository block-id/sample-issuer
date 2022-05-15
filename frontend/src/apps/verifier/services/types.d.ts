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
    id: {
      data: {
        idType: string;
        idName: string;
        issuer: {
          name: string;
          publicKey: string;
          logo: string;
        },
        groups: AttributeGroup[],
      };
      signature: string;
    };
    entropy: string;
  };
  signature: string;
}

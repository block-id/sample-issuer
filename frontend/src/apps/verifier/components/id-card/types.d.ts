interface IdCardProps {
  verifiable_id: VerifiableId['data'];
}

interface VerifiableId {
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
}

interface AttributeGroup {
  data: {
    groupName: string;
    attributes: {
      [key: string]: {
        type: 'string' | 'image';
        value: string;
      }
    }
  },
  subject: {
    publicKey: string;
  },
  issuer: {
    publicKey: string;
  },
  issuedAt: string;
  expiresAt: string;
  signature: string;
}

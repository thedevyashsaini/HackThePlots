import { jwtVerify } from "jose";

interface CertificatePayload {
  id: string;
  name: string;
  teamName: string;
  standing: string;
  eventName: string;
}

export default async function Certificate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const certID = (await params).id;
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload: certPayload }: { payload: CertificatePayload } =
      await jwtVerify(certID, secret);

    return (
      <>
        <h1>Tech Hunt Certificate Verified!</h1>
        <h2>{certPayload.name}</h2>
        <h2>{certPayload.teamName}</h2>
        <h2>{certPayload.standing}</h2>
        <h2>{certPayload.eventName}</h2>
      </>
    );
  } catch (e) {
    // Invalid cert probably

    return (
      <>
        <h1>Invalid Certificate</h1>
      </>
    );
  }
}

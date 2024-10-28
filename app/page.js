import Link from "next/link";


export default function Home() {
  return (
    <main className="relative flex flex-col gap-56 h-screen justify-center items-center w-full">
      <h1>Adventure Awaits.</h1>
      <Link href="/survey-user">
        <button className="border-solid border-2">
          <p>Let&apos;s get to it</p>
        </button>
      </Link>
    </main>
  );
}

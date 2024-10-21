import Link from "next/link";

export default function Intinerary() {
  return (
    <div>
        <h2>Your Trip</h2>
        <div>Place</div>
        <div>Date</div>
        <div>Intinerary</div>
        <div>
            <div>Day 1</div>
            <div>Day 2</div>
            <div>Day 3</div>
        </div>
        <Link href="/trip">
            <button className="border-solid border-2">
            <p>Save</p>
            </button>
        </Link>
       
    </div>
  );
}

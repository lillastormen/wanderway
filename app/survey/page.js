import Link from "next/link";

export default function Survey() {
  return (
    <>    
    <h2>Surveyyyy</h2>
    <form>
      <div>
        <p>Name</p>
        <input type="text" id="name" name="first-name"/>  
      </div>
      <div>
        <p>Age</p>
        <div>
          <input type="radio" id="age1" name="age1"/>  
          <label for="age1">-25</label>
        </div>
        <div>
          <input type="radio" id="age2" name="age2"/> 
          <label for="age2">25-31</label> 
        </div>
        <div>
          <input type="radio" id="age3" name="age3"/>  
          <label for="age3">32-38</label> 
        </div>
        <div>
          <input type="radio" id="age4" name="age4"/>
          <label for="age4">39-45</label>  
        </div>
        <div>
          <input type="radio" id="age5" name="age5"/>  
          <label for="age5">45+</label> 
        </div>
      </div>
      <div>
        <p>Identity</p>
        <div>
          <input type="radio" id="pronouns" name="female"/>  
          <label for="female">Female</label> 
        </div>
        <div>
          <input type="radio" id="pronouns" name="male"/>  
          <label for="male">Male</label> 
        </div>
        <div>
          <input type="radio" id="pronouns" name="non-binary"/>  
          <label for="non-binary">Non-binary</label> 
        </div>
        <div>
          <input type="radio" id="pronouns" name="secret"/>  
          <label for="secret">Prefer not to say</label> 
        </div>
      </div>
      <div>
        <p>Traveller type</p>
        <div>
          <input type="radio" id="solo" name="solo"/>  
          <label for="solo">Solo</label> 
        </div>
        <div>
          <input type="radio" id="friends" name="friends"/>
          <label for="friends">Friends</label>  
        </div>
        <div>
          <input type="radio" id="family" name="family"/>  
          <label for="family">Family</label> 
        </div>
      </div>
      <div>
        <p>Destination</p>
        DROPDOWN COMES HERE
      </div>
      <div>
        <p>Trip dates</p>
        CALENDAR
      </div>
      <div>
        <p>Budget</p>
        <div>
          <input type="radio" id="explorer" name="explorer"/>
          <label for="explorer">Explorer</label>  
        </div>
        <div>
          <input type="radio" id="comfort" name="comfort"/>
          <label for="comfort">Comfort</label>  
        </div>
        <div>
          <input type="radio" id="indulge" name="indulge"/>
          <label for="indluge">Indulge</label>  
        </div>
      </div>
      <div>
        <p>Interests</p>
        <input type="checkbox" id="vehicle1" name="museums" value="museums"/>
        <label for="museums">Museums</label>
        <input type="checkbox" id="art-galleries" name="art-galleries" value="art-galleries"/>
        <label for="art-galleries">Art-galleries</label>
        <input type="checkbox" id="nightlife" name="nightlife" value="nightlife"/>
        <label for="nightlife">Nightlife</label>
        <input type="checkbox" id="food" name="food" value="food"/>
        <label for="food">Food</label>
        <input type="checkbox" id="hiking" name="hiking" value="hiking"/>
        <label for="hiking">Hiking</label>
        <input type="checkbox" id="beaches" name="beaches" value="beaches"/>
        <label for="beaches">Beaches</label>
        <input type="checkbox" id="shopping" name="shopping" value="shopping"/>
        <label for="shopping">Shopping</label>
        <input type="checkbox" id="music" name="music" value="music"/>
        <label for="music">Music</label>
        <input type="checkbox" id="theater" name="theater" value="theater"/>
        <label for="theater">Theater</label>
        <input type="checkbox" id="architecture" name="architecture" value="architecture"/>
        <label for="architecture">Architecture</label>
        <input type="checkbox" id="photo-ops" name="photo-ops" value="photo-ops"/>
        <label for="photo-ops">Photo Ops</label>
      </div>
      <div> 
        <p>Peace</p>
        <div>
          <input type="radio" id="relaxed" name="relaxed"/>
          <label for="relaxed">Relaxed</label>  
        </div>
        <div>
          <input type="radio" id="adventurer" name="adventurer"/>
          <label for="adventurer">Adventurer</label>  
        </div>
        <div>
          <input type="radio" id="thrill-seeker" name="thrill-seeker"/>
          <label for="thrill-seeker">Thrill-seeker</label>  
        </div>
      </div>
    </form>
    <Link href="/intinerary">
      <button className="border-solid border-2">
      <p>Ready!</p>
      </button>
    </Link>
    </>

  );
}

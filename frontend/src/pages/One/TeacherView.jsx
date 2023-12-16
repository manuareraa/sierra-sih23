import React, { useEffect, useState } from "react";
import { useAppContext } from "../../utils/AppContext";
import { useParams } from "react-router-dom";

import tProfileIcon from "../../assets/img/teacher.png";
import { Button } from "@nextui-org/react";

function TeacherView(props) {
  const { appState } = useAppContext();
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState({});
  const [history, setHistory] = useState([]);

  const txnHashes = [
    "0xa4f5f69fe3e49346de4084488d1cd186c55fe8460ef7d32a8c908db40024d514",
    "0x7b6ac6586f37013a547236eb57211b3c250e841e66fe572ac411e3d2018bf12e",
    "0x98f9f457e10d34e5f2406f8744f57bae902788d3f7eeb1a23e78921a3e27244f",
    "0x5811d6d88c4e25622d88062d69ba534e5eb3be41b0cc369b76d3cfaeae5df59e",
    "0x5b84150a421819bb88e5a2a93c386bec5f8a5ba58d7798d76946e6c9392faa09",
    "0x8a45407a7241d8ff8b494c45c26202e3b59227303e0907f7c55fd7c0999eae49",
    "0xdaba467e2b8dc481465da5a8bea2bcd8605cc59719def8c794de06c45738fe44",
    "0x5b6b013205c304b5f1d4c4d06b72e66cdaf88164de895f31846f228eb0d214ab",
    "0x066409bec06f6a27f1ba0d910ef6716b88cf00d4fbcf829156cf6f0d03a1f0be",
    "0x9c7f067ef36319312c4b375f03043b5c8545a615ae17c90370c7a185c383deaf",
    "0xde33b086e9dd02e04b44bab4e25a457c60268889b2bf433f86ce8208cea716ff",
    "0xdc0868921c3165d44a6df81b03e78fb6190e7338e55e2fc314f174070352c962",
    "0x039cc182f5c58405392c4c85833a3e19126b829b80cc8e24840a24f66b0e1cf6",
    "0x9e5c3c61acd7bb09f15c09920d09b6985d11d46dbec0a33eac7ada3848a34ac2",
    "0xeaf5da1f97181927ff5c615a18abcb32db0ff62ab7277aa0b7dc5c95317f4575",
    "0x92fd18d95dd342e153b65bfd153ffb6e25be11de2c9012f770237aca0155b524",
    "0x0fe6f8e6017d509e708830cbd1660b6185ff2cceba1700d7ac492b8a84964219",
    "0x736820f80bff42a07bbe1ecfb4428d339b2ffc2f434a435282fa1d5266c2e84b",
    "0xfbc53967532ba7ba1811c03b66b4b031cf27ac391828bc66c23c98a8b8956184",
    "0x706e1b445a4d74fd9764f35c27ee082d4618d8d378b0848c70cde9bbec7695d1",
    "0x2491080d34975dbe295e2da5ffc7d9a12314141fa4e04909a2b3c04655cc5640",
    "0xedd3a96ba735252eb894b4514c6ade282fdba5c289a3de1ef8e014639f747304",
    "0x9658bf12c76dc9e9ca6dfcce4c716d98081be23048827fa5b364c1f9521b5514",
    "0x946d665c12e11527c50677515a30a805305521db162e6fc4a70f40ab2fa796d7",
    "0xa9bc7120087940d015bcb3dcd4b9dbad95613abaedb4218805870b93a397c4ed",
    "0x11b2e4ba7ae64faf69e1df2530e47066e39533f05fe36ef54ad89cf0225b9f57",
    "0x68750f2256979eccac108ed9e4d670868f6cacf06dc94a80159f11777c2e85ef",
    "0xe8469eb16a60904ff65e51bd400b2cb4b83e33a0608e4ddc83800824cd369360",
    "0x3db365a6b0e2be4879d15d595fb9100a290f1d593364498c9f0bd5238b34be91",
    "0x195e219dae5bda66ea304b84cdb200ef17fe0cf8e0fb9b7a1747ca9b2a9675a9",
    "0xa37382e31271f398218fbd2b88a574ee9ec2e792831a9c40ddf740d79e51c99c",
    "0xbf0726b20c14c8fa035fe1166b1250eb045c339ce54939344cfe6ab2eda0e466",
    "0x2713ae86b8b1c7408b1876627d238da109da47997a1f2495fed851b13fd4bb47",
    "0x6b925fb534cae26b1a0ca478f62ebed0b84e58970e0ab9d5614cb1c1b696cc9a",
    "0x0bcb53f01cc8476c9088ef4a094ecf1754715401acab7ad1e040700f90c59555",
    "0x9855c06960ce1199134831324e45f0b4541fd5dd5788962ed4a977003efd5884",
    "0xed300e39936ec549d73ce9799216b9f1cc67e88cd44ca2d7d086a4e0be641518",
    "0x4105f0841b739023d9369a99b7a975e4b68d734b4a19bcecca96e195c38128a3",
    "0xd632884c2d426acf00c980d2c33736927ff745dd2394514b0e4a7fde3f1642f1",
    "0x5b74e99528d32a7d1bef494fef19aca753bdbc824aaed6257ce521074aa17268",
  ];

  const generateHistory = (reputation, experience) => {
    console.log("Generating history for: ", reputation, experience);

    const schools = [
      "Oakwood Academy",
      "Riverbend High School",
      "City Lights Preparatory",
      "Crestview Middle School",
      "Sunnybrook Elementary",
      "Maplewood Grove College",
      "Bayside International School",
      "Emerald Valley Community School",
      "Lighthouse Point Academy",
      "Stargazer Institute of Technology",
      "Horizon Academy of Arts and Sciences",
      "Phoenix Rise Charter School",
      "Whispering Pines Preparatory",
      "Riverbank University",
      "Skyview Middle School",
      "Hilltop Academy for the Gifted",
      "Meadowbrook Elementary",
      "Coastal Heights Community College",
      "Sunset Ridge High School",
      "Granite Falls Institute of Technology",
      "North Star Preparatory Academy",
      "Valley Vista Community School",
      "Windhaven Elementary School",
      "Oceanview Middle School",
      "Sunstone University",
      "Timbercreek High School",
      "Evergreen Academy of Arts and Sciences",
      "Canyonview Charter School",
      "Lakeside Preparatory Academy",
      "Moonrise Institute of Technology",
    ];

    let history = [];
    let remainingReputation = reputation;
    let remainingExperience = experience;

    // Define the maximum length for the history array.
    const maxLength = Math.min(
      Math.floor(Math.random() * 7) + 2,
      Math.floor(experience / 2)
    );

    while (
      history.length < maxLength &&
      remainingExperience > 0 &&
      remainingReputation > 0
    ) {
      const school = schools[Math.floor(Math.random() * schools.length)];
      // Calculate the 'from' year, ensuring a minimum experience length of 1 year
      const periodFrom = Math.max(1995, 2023 - remainingExperience);
      // Randomly determine the duration based on remaining experience, but at least 1 year
      const duration = Math.min(
        Math.floor(Math.random() * remainingExperience) + 1,
        remainingExperience
      );
      // Calculate the 'to' year based on 'from' year and duration
      const periodTo = periodFrom + duration;

      // Deduct the experience 'spent' on this history record
      remainingExperience -= duration;

      // Distribute the reputation; ensure at least 1 rep is collected
      const repCollected = Math.min(
        Math.floor(Math.random() * remainingReputation) + 1,
        remainingReputation
      );

      // Deduct the reputation 'spent' on this history record
      remainingReputation -= repCollected;

      // generate a random number between 0 and 36
      const randomIndex = Math.floor(Math.random() * 36);

      // Create the history record
      const record = {
        school,
        periodFrom,
        periodTo,
        duration,
        repCollected,
        txnHash: txnHashes[randomIndex],
      };

      // Add the record to the history array
      history.push(record);
    }

    setHistory(history);
    console.log("History: ", history);
    return history;
  };

  useEffect(() => {
    console.log("Teachers Pg:: ", appState.teachers);
    appState.teachers.map((t) => {
      if (t.tokenId === parseInt(teacherId)) {
        setTeacher(t);
        // generateHistory(parseInt(t.reputation), parseInt(t.yearsOfExperience));
        generateHistory(66, 12);
      }
    });

    console.log("Teacher: ", teacher);
  }, [appState.teachers]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 py-10 ">
      {/* title */}
      <div className="">
        <p className="my-4 text-xl font-bold">Teacher Profile</p>
      </div>
      <div className="divider"></div>

      {/* body */}
      <div className="flex flex-col items-center justify-center w-full px-60">
        {/* top container */}
        <div className="flex flex-row items-center justify-center w-full mt-6 gap-x-16">
          {/* col 1 */}
          <div className="flex flex-row gap-x-8">
            <img src={tProfileIcon} className="w-40 h-40" />
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              Name: <span className="font-bold">{teacher.name}</span>
              Department:{" "}
              <span className="font-bold">{teacher.department}</span>
              DOB: <span className="font-bold">{teacher.dob}</span>
              Experience:{" "}
              <span className="font-bold">
                {teacher.yearsOfExperience} Years
              </span>
            </div>
          </div>

          {/* col 2 */}
          <div className="flex flex-row">
            <div className="shadow stats">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Reputation</div>
                <div className="stat-value text-primary">
                  {teacher.reputation}
                </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>

              {/* sbt id */}
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">SBT ID</div>
                <div className="stat-value text-primary">{teacher.tokenId}</div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>

        {/* skillset container */}
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-xl font-bold">Skillset</p>
          </div>

          {/* skillset */}
          <div className="flex">
            <div className="shadow stats">
              {/* one-to-one */}
              <div className="stat">
                <div className="stat-figure text-primary">{/* svg */}</div>
                <div className="stat-title">One-to-One</div>
                <div className="stat-value text-primary">
                  {teacher.reputation}
                </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>

              {/* project-based */}
              <div className="stat">
                <div className="stat-figure text-primary">{/* svg */}</div>
                <div className="stat-title">Project Based</div>
                <div className="stat-value text-primary">
                  {teacher.reputation}
                </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>

              {/* online */}
              <div className="stat">
                <div className="stat-figure text-primary">{/* svg */}</div>
                <div className="stat-title">Online</div>
                <div className="stat-value text-primary">{teacher.tokenId}</div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>
          </div>
        </div>

        {/* work and rep container */}
        <div className="flex flex-col mt-14">
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-xl font-bold">Work and Reputation History</p>
          </div>

          {/* work and rep */}
          <div className="flex">
            <div className="w-full overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Institution</th>
                    <th>Duration</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Reputation</th>
                    <th>Verify</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((record, index) => {
                    return (
                      <tr key={index} className="hover">
                        <th>{index + 1}</th>
                        <td>{record.school}</td>
                        <td>{record.duration}</td>
                        <td>{record.periodFrom}</td>
                        <td>{record.periodTo}</td>
                        <td>{record.repCollected}</td>
                        <td>
                          <Button
                            size="sm"
                            className=""
                            onPress={() => {
                              window.open(
                                "https://mumbai.polygonscan.com/tx/" +
                                  record.txnHash,
                                "_blank"
                              );
                            }}
                          >
                            Verify
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherView;

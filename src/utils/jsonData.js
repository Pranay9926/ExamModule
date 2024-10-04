
export const bankData = [
  { "text": "Question Bank 1", "value": 1, "marks": 100 },
  { "text": "Question Bank 2", "value": 2, "marks": 100 },
  { "text": "Question Bank 3", "value": 3, "marks": 100 },
  { "text": "Question Bank 4", "value": 4, "marks": 100 },
  { "text": "Question Bank 5", "value": 5, "marks": 100 },
]

export const timeOptionsHours = [
  { label: '12 AM', value: '00' },
  { label: '01 AM', value: '01' },
  { label: '02 AM', value: '02' },
  { label: '03 AM', value: '03' },
  { label: '04 AM', value: '04' },
  { label: '05 AM', value: '05' },
  { label: '06 AM', value: '06' },
  { label: '07 AM', value: '07' },
  { label: '08 AM', value: '08' },
  { label: '09 AM', value: '09' },
  { label: '10 AM', value: '10' },
  { label: '11 AM', value: '11' },
  { label: '12 PM', value: '12' },
  { label: '01 PM', value: '13' },
  { label: '02 PM', value: '14' },
  { label: '03 PM', value: '15' },
  { label: '04 PM', value: '16' },
  { label: '05 PM', value: '17' },
  { label: '06 PM', value: '18' },
  { label: '07 PM', value: '19' },
  { label: '08 PM', value: '20' },
  { label: '09 PM', value: '21' },
  { label: '10 PM', value: '22' },
  { label: '11 PM', value: '23' },
];

export const timeOptionsMinutes = ['00', '15', '30', '45'];

export const questionData = [
  {
    id: 1,
    question: "Difference between clock buffers/inverters and normal buffers/inverters is",
    options: [
      "Clock buffers/inverter are faster than normal buffers/inverters",
      "Clock buffers/inverter are slower than normal buffers/inverters",
      "Clock buffers/inverters are having equal fall and rise times with high drive strengths than normal buffers/inverters",
      "Normal buffers/inverters are having equal fall and rise times with high drive strengths than clock buffers/inverters",
    ],

  },
  {
    id: 2,
    question: "What is the purpose of a flip-flop in digital circuits?",
    options: [
      "To store a single bit of data",
      "To perform arithmetic operations",
      "To generate clock signals",
      "To amplify digital signals"
    ],

  },
  {
    id: 3,
    question: "What is the difference between synchronous and asynchronous sequential circuits?",
    options: [
      "Synchronous circuits use a clock signal to control the timing of state changes, while asynchronous circuits do not.",
      "Synchronous circuits are faster than asynchronous circuits.",
      "Asynchronous circuits are more complex to design than synchronous circuits.",
      "Synchronous circuits are only used in digital computers."
    ],

  },
  {
    id: 4,
    question: "What is the function of a decoder in digital circuits?",
    options: [
      "To convert a binary code into a decimal number",
      "To amplify digital signals",
      "To generate clock signals",
      "To store data"
    ],

  },
  {
    id: 5,
    question: "What is the difference between a combinational circuit and a sequential circuit?",
    options: [
      "Combinational circuits produce an output based only on the current input values, while sequential circuits also depend on their previous state.",
      "Combinational circuits are faster than sequential circuits.",
      "Sequential circuits are used only in digital computers.",
      "Combinational circuits are more complex to design than sequential circuits."
    ],

  },
  {
    id: 6,
    question: "What is the purpose of a multiplexer in digital circuits?",
    options: [
      "To select one of several input signals based on a control signal.",
      "To amplify digital signals.",
      "To generate clock signals.",
      "To store data."
    ],

  },
  {
    id: 7,
    question: "What is the difference between a NAND gate and a NOR gate?",
    options: [
      "A NAND gate produces a high output only when all inputs are low, while a NOR gate produces a high output only when all inputs are high.",
      "A NAND gate is faster than a NOR gate.",
      "A NOR gate is used only in digital computers.",
      "A NAND gate is more complex to design than a NOR gate."
    ],

  },
  {
    id: 8,
    question: "What is the purpose of a register in digital circuits?",
    options: [
      "To store a fixed number of bits of data.",
      "To amplify digital signals.",
      "To generate clock signals.",
      "To select one of several input signals based on a control signal."
    ],

  },
  {
    id: 9,
    question: "What is the difference between a half-adder and a full-adder?",
    options: [
      "A half-adder adds two single bits, while a full-adder adds three bits (two inputs and a carry-in).",
      "A half-adder is faster than a full-adder.",
      "A full-adder is used only in digital computers.",
      "A half-adder is more complex to design than a full-adder."
    ],

  },
  {
    id: 10,
    question: "What is the purpose of a shift register in digital circuits?",
    options: [
      "To shift data bits left or right.",
      "To amplify digital signals.",
      "To generate clock signals.",
      "To select one of several input signals based on a control signal."
    ],

  }
];

// Sample data for the exams
const data1 = [
  {
    examName: 'March DV Test',
    subjectName: "Maths",
    time: 'Anytime',
    mode: 'Online',
    duration: '00:30:00',
    status: 'Available'
  },
  {
    examName: 'March PD 1 & PD2 Test 9',
    subjectName: "English",
    time: 'ByToday',
    mode: 'Online',
    duration: '00:45:00',
    status: 'Available'
  },
  {
    examName: 'Nov PD Test 24',
    subjectName: "Hindi",
    time: 'Anytime',
    mode: 'Online',
    duration: '00:30:00',
    status: 'Available'
  }
];

// // The starting time in MM:SS format (19 minutes and 14 seconds in your example)
// const initialTime = "19:14";

// // Convert MM:SS into seconds
// const timeToSeconds = (timeString) => {
//   const [minutes, seconds] = timeString.split(':').map(Number);
//   return minutes * 60 + seconds; // Convert to total seconds
// };

// // Function to format time as MM:SS (since hours are not needed)
// const formatTime = (seconds) => {
//   const minutes = Math.floor(seconds / 60);
//   const secs = seconds % 60;
//   return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// };
// const [timeLeft, setTimeLeft] = useState(timeToSeconds(initialTime)); // Convert initialTime to seconds


// useEffect(() => {
//   // Start the countdown when the component mounts
//   const countdown = setInterval(() => {
//     setTimeLeft((prevTimeLeft) => {
//       if (prevTimeLeft <= 0) {
//         clearInterval(countdown);
//         return 0; // Stop at 0
//       }
//       return prevTimeLeft - 1; // Decrease time by 1 second
//     });
//   }, 1000);

//   // Cleanup the interval on unmount
//   return () => clearInterval(countdown);
// }, []);




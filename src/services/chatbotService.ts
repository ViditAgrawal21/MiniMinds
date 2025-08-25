// Chatbot Service for Mental Health Professional Messaging
export interface Psychologist {
  id: string;
  Psychologist_Id?: string;
  Name: string;
  Degree: string;
  Languages: string[];
  PsychologistType: string;
  experience?: number;
  speciality?: string[];
  rating?: number;
  price20min?: number;
  price45min?: number;
  available?: boolean;
  nextAvailableSlot?: string;
}

export interface BookingData {
  psychologistId: string;
  userId: string;
  duration: "20min" | "45min";
  slot: string;
  price: number;
  paymentStatus: "pending" | "completed" | "failed";
  bookingId?: string;
  joinLink?: string;
}

export interface ChatMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  options?: ChatOption[];
}

export interface ChatOption {
  id: string;
  text: string;
  action: string;
  data?: any;
}

class ChatbotService {
  private baseUrl = "http://localhost:3001"; // Replace with your actual backend URL
  private userId = "user125"; // This should come from your auth system
  private hasActiveBooking = false;

  // Mock data for development - replace with actual API calls
  private mockPsychologists: Psychologist[] = [
    {
      id: "1",
      Psychologist_Id: "PSY001",
      Name: "Dr. Sarah Johnson",
      Degree: "Ph.D. in Clinical Psychology",
      Languages: ["English", "Hindi"],
      PsychologistType: "Clinical Psychologist",
      experience: 8,
      speciality: ["Anxiety", "Depression", "PTSD"],
      rating: 4.8,
      price20min: 800,
      price45min: 1500,
      available: true,
      nextAvailableSlot: "Today 3:00 PM",
    },
    {
      id: "2",
      Psychologist_Id: "PSY002",
      Name: "Dr. Amit Sharma",
      Degree: "M.D. Psychiatry",
      Languages: ["Hindi", "English", "Marathi"],
      PsychologistType: "Clinical Psychologist",
      experience: 12,
      speciality: ["Addiction", "Stress Management"],
      rating: 4.9,
      price20min: 1000,
      price45min: 1800,
      available: true,
      nextAvailableSlot: "Tomorrow 10:00 AM",
    },
    {
      id: "3",
      Psychologist_Id: "PSY003",
      Name: "Dr. Priya Patel",
      Degree: "Ph.D. Child Psychology",
      Languages: ["English", "Hindi"],
      PsychologistType: "Child Counselor",
      experience: 6,
      speciality: ["Child Behavior", "Learning Disabilities"],
      rating: 4.7,
      price20min: 700,
      price45min: 1300,
      available: true,
      nextAvailableSlot: "Today 5:00 PM",
    },
    {
      id: "4",
      Psychologist_Id: "PSY004",
      Name: "Dr. Rajesh Kumar",
      Degree: "Certified Yoga Therapist",
      Languages: ["Hindi", "English"],
      PsychologistType: "Yoga/Meditation Therapist",
      experience: 10,
      speciality: ["Stress Relief", "Mindfulness", "Anxiety"],
      rating: 4.6,
      price20min: 600,
      price45min: 1100,
      available: true,
      nextAvailableSlot: "Today 6:00 PM",
    },
    {
      id: "5",
      Psychologist_Id: "PSY005",
      Name: "Dr. Meera Singh",
      Degree: "Ph.D. in Sexual Health",
      Languages: ["English", "Hindi"],
      PsychologistType: "Sex Therapist",
      experience: 9,
      speciality: ["Relationship Issues", "Sexual Health", "Intimacy"],
      rating: 4.9,
      price20min: 1200,
      price45min: 2000,
      available: true,
      nextAvailableSlot: "Tomorrow 11:00 AM",
    },
  ];

  async getGreetingMessage(): Promise<ChatMessage> {
    const options: ChatOption[] = [
      {
        id: "emergency",
        text: "🚨 Emergency Calling",
        action: "emergency_calling",
      },
      {
        id: "browse_problem",
        text: "🔍 Browse by Problem",
        action: "browse_by_problem",
      },
      {
        id: "browse_language",
        text: "🌐 Browse by Language",
        action: "browse_by_language",
      },
    ];

    if (this.hasActiveBooking) {
      options.push(
        {
          id: "cancel_booking",
          text: "❌ Cancel Booking",
          action: "cancel_booking",
        },
        {
          id: "reschedule",
          text: "📅 Reschedule Booking",
          action: "reschedule_booking",
        }
      );
    }

    return {
      id: Date.now().toString(),
      type: "bot",
      content:
        "Hello! I'm here to help you connect with mental health professionals. How can I assist you today?",
      timestamp: new Date(),
      options,
    };
  }

  async handleEmergencyCall(): Promise<ChatMessage[]> {
    return [
      {
        id: Date.now().toString(),
        type: "bot",
        content:
          "🚨 Emergency Support\n\nFor immediate assistance, we'll connect you with an available professional right away.\n\n⚠️ Emergency sessions are scheduled for the earliest possible slot.\n\n📋 Before we proceed:\n• Ensure you have a quiet, private space\n• Good internet connection for video call\n• 45 minutes of uninterrupted time",
        timestamp: new Date(),
        options: [
          {
            id: "proceed_emergency",
            text: "Continue with Emergency Booking",
            action: "emergency_payment",
          },
          { id: "back", text: "← Back to Menu", action: "greeting" },
        ],
      },
    ];
  }

  async getBrowseByProblemOptions(): Promise<ChatMessage> {
    return {
      id: Date.now().toString(),
      type: "bot",
      content: "Please select the type of specialist you'd like to consult:",
      timestamp: new Date(),
      options: [
        {
          id: "clinical",
          text: "🧠 Clinical Psychologist",
          action: "browse_specialists",
          data: { type: "Clinical Psychologist" },
        },
        {
          id: "child",
          text: "👶 Child Counselor",
          action: "browse_specialists",
          data: { type: "Child Counselor" },
        },
        {
          id: "yoga",
          text: "🧘 Yoga/Meditation Therapist",
          action: "browse_specialists",
          data: { type: "Yoga/Meditation Therapist" },
        },
        {
          id: "sex",
          text: "💑 Sex Therapist",
          action: "browse_specialists",
          data: { type: "Sex Therapist" },
        },
        { id: "back", text: "← Back", action: "greeting" },
      ],
    };
  }

  async getBrowseByLanguageOptions(): Promise<ChatMessage> {
    return {
      id: Date.now().toString(),
      type: "bot",
      content: "Please select your preferred language:",
      timestamp: new Date(),
      options: [
        {
          id: "hindi",
          text: "हिंदी Hindi",
          action: "browse_language_specialists",
          data: { language: "Hindi" },
        },
        {
          id: "marathi",
          text: "मराठी Marathi",
          action: "browse_language_specialists",
          data: { language: "Marathi" },
        },
        {
          id: "english",
          text: "🇬🇧 English",
          action: "browse_language_specialists",
          data: { language: "English" },
        },
        { id: "back", text: "← Back", action: "greeting" },
      ],
    };
  }

  async getPsychologistsByType(type: string): Promise<ChatMessage[]> {
    // Filter psychologists by type
    const filteredPsychologists = this.mockPsychologists.filter(
      (p) => p.PsychologistType === type
    );

    const messages: ChatMessage[] = [
      {
        id: Date.now().toString(),
        type: "bot",
        content: `Here are available ${type}s:`,
        timestamp: new Date(),
        options: [],
      },
    ];

    // Create options for each psychologist
    const psychologistOptions: ChatOption[] = filteredPsychologists.map(
      (p, index) => ({
        id: `psy_${p.id}`,
        text: `${index + 1}. Dr. ${p.Name}\n   ${
          p.Degree
        }\n   Languages: ${p.Languages.join(", ")}\n   ⭐ ${p.rating} • Next: ${
          p.nextAvailableSlot
        }`,
        action: "view_psychologist_details",
        data: { psychologistId: p.id },
      })
    );

    psychologistOptions.push(
      {
        id: "load_more",
        text: "📄 Load More Psychologists",
        action: "load_more_psychologists",
        data: { type },
      },
      { id: "back", text: "← Back", action: "browse_by_problem" }
    );

    messages[0].options = psychologistOptions;
    return messages;
  }

  async getPsychologistsByLanguage(language: string): Promise<ChatMessage[]> {
    // Filter psychologists by language
    const filteredPsychologists = this.mockPsychologists.filter((p) =>
      p.Languages.includes(language)
    );

    const messages: ChatMessage[] = [
      {
        id: Date.now().toString(),
        type: "bot",
        content: `Here are psychologists who speak ${language}:`,
        timestamp: new Date(),
        options: [],
      },
    ];

    // Create options for each psychologist
    const psychologistOptions: ChatOption[] = filteredPsychologists.map(
      (p, index) => ({
        id: `psy_${p.id}`,
        text: `${index + 1}. Dr. ${p.Name}\n   ${p.PsychologistType}\n   ${
          p.Degree
        }\n   ⭐ ${p.rating} • Next: ${p.nextAvailableSlot}`,
        action: "view_psychologist_details",
        data: { psychologistId: p.id },
      })
    );

    psychologistOptions.push(
      {
        id: "load_more",
        text: "📄 Load More Psychologists",
        action: "load_more_psychologists",
        data: { language },
      },
      { id: "back", text: "← Back", action: "browse_by_language" }
    );

    messages[0].options = psychologistOptions;
    return messages;
  }

  async getPsychologistDetails(psychologistId: string): Promise<ChatMessage[]> {
    const psychologist = this.mockPsychologists.find(
      (p) => p.id === psychologistId
    );

    if (!psychologist) {
      return [
        {
          id: Date.now().toString(),
          type: "bot",
          content:
            "Sorry, I couldn't find that psychologist. Please try again.",
          timestamp: new Date(),
          options: [{ id: "back", text: "← Back", action: "greeting" }],
        },
      ];
    }

    return [
      {
        id: Date.now().toString(),
        type: "bot",
        content: `👨‍⚕️ **Dr. ${psychologist.Name}**\n\n🎓 **Qualification:** ${
          psychologist.Degree
        }\n🏥 **Specialization:** ${
          psychologist.PsychologistType
        }\n💼 **Experience:** ${
          psychologist.experience
        } years\n🌟 **Rating:** ${
          psychologist.rating
        }/5\n🗣️ **Languages:** ${psychologist.Languages.join(
          ", "
        )}\n🏷️ **Specialties:** ${psychologist.speciality?.join(
          ", "
        )}\n\n💰 **Consultation Fees:**\n• 20 minutes: ₹${
          psychologist.price20min
        }\n• 45 minutes: ₹${
          psychologist.price45min
        }\n\n📅 **Next Available:** ${psychologist.nextAvailableSlot}`,
        timestamp: new Date(),
        options: [
          {
            id: "book_appointment",
            text: "📅 Book Appointment",
            action: "booking_options",
            data: { psychologistId: psychologist.id },
          },
          { id: "back", text: "← Back to List", action: "greeting" },
        ],
      },
    ];
  }

  async getBookingOptions(psychologistId: string): Promise<ChatMessage> {
    const psychologist = this.mockPsychologists.find(
      (p) => p.id === psychologistId
    );

    return {
      id: Date.now().toString(),
      type: "bot",
      content: `Select consultation duration with Dr. ${psychologist?.Name}:`,
      timestamp: new Date(),
      options: [
        {
          id: "book_20min",
          text: `⏰ 20 Minutes - ₹${psychologist?.price20min}`,
          action: "select_time_slot",
          data: {
            psychologistId,
            duration: "20min",
            price: psychologist?.price20min,
          },
        },
        {
          id: "book_45min",
          text: `⏰ 45 Minutes - ₹${psychologist?.price45min}`,
          action: "select_time_slot",
          data: {
            psychologistId,
            duration: "45min",
            price: psychologist?.price45min,
          },
        },
        {
          id: "back",
          text: "← Back",
          action: "view_psychologist_details",
          data: { psychologistId },
        },
      ],
    };
  }

  async getTimeSlots(bookingData: Partial<BookingData>): Promise<ChatMessage> {
    // Mock time slots - replace with actual API call
    const timeSlots = [
      "Today 3:00 PM",
      "Today 5:00 PM",
      "Tomorrow 10:00 AM",
      "Tomorrow 2:00 PM",
      "Tomorrow 4:00 PM",
    ];

    return {
      id: Date.now().toString(),
      type: "bot",
      content: `Select your preferred time slot for ${bookingData.duration} consultation:`,
      timestamp: new Date(),
      options: [
        ...timeSlots.map((slot, index) => ({
          id: `slot_${index}`,
          text: slot,
          action: "confirm_booking",
          data: { ...bookingData, slot },
        })),
        {
          id: "back",
          text: "← Back",
          action: "booking_options",
          data: { psychologistId: bookingData.psychologistId },
        },
      ],
    };
  }

  async confirmBooking(bookingData: BookingData): Promise<ChatMessage> {
    const psychologist = this.mockPsychologists.find(
      (p) => p.id === bookingData.psychologistId
    );

    return {
      id: Date.now().toString(),
      type: "bot",
      content: `🔒 **Booking Confirmation**\n\n👨‍⚕️ **Doctor:** Dr. ${psychologist?.Name}\n⏰ **Duration:** ${bookingData.duration}\n📅 **Slot:** ${bookingData.slot}\n💰 **Amount:** ₹${bookingData.price}\n\n📋 **Before your session:**\n• Join 15 minutes before your scheduled time\n• Ensure stable internet connection\n• Find a quiet, private space\n• Keep your phone charged\n\n💳 Proceed to payment to confirm your booking.`,
      timestamp: new Date(),
      options: [
        {
          id: "proceed_payment",
          text: "💳 Proceed to Payment",
          action: "process_payment",
          data: bookingData,
        },
        {
          id: "back",
          text: "← Back",
          action: "select_time_slot",
          data: bookingData,
        },
      ],
    };
  }

  async processPayment(bookingData: BookingData): Promise<ChatMessage[]> {
    // Simulate payment processing
    const bookingId = `BK${Date.now()}`;
    const joinLink = `https://meet.google.com/abc-defg-hij`;

    this.hasActiveBooking = true;

    return [
      {
        id: Date.now().toString(),
        type: "bot",
        content: "💳 Processing payment...",
        timestamp: new Date(),
        options: [],
      },
      {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: `✅ **Payment Successful!**\n\n🎫 **Booking ID:** ${bookingId}\n📧 **Receipt sent to your email**\n\n🔗 **Join Link:** ${joinLink}\n*(Available 15 minutes before your session)*\n\n📱 **Important Instructions:**\n• Join the video call at your scheduled time\n• You'll receive a reminder 30 minutes before\n• Contact support if you face any issues\n\n📞 **Support:** +91-XXXX-XXXX-XX`,
        timestamp: new Date(),
        options: [
          {
            id: "add_calendar",
            text: "📅 Add to Calendar",
            action: "add_to_calendar",
            data: { bookingId, ...bookingData },
          },
          { id: "main_menu", text: "🏠 Back to Main Menu", action: "greeting" },
        ],
      },
    ];
  }

  async handleCancelBooking(): Promise<ChatMessage> {
    return {
      id: Date.now().toString(),
      type: "bot",
      content:
        "❌ **Cancel Booking**\n\nAre you sure you want to cancel your upcoming appointment?\n\n⚠️ **Cancellation Policy:**\n• Cancellations 24+ hours before: Full refund\n• Cancellations within 24 hours: 50% refund\n• No-show: No refund",
      timestamp: new Date(),
      options: [
        {
          id: "confirm_cancel",
          text: "Yes, Cancel Booking",
          action: "confirm_cancellation",
        },
        { id: "back", text: "← Keep Booking", action: "greeting" },
      ],
    };
  }

  async confirmCancellation(): Promise<ChatMessage> {
    this.hasActiveBooking = false;

    return {
      id: Date.now().toString(),
      type: "bot",
      content:
        "✅ **Booking Cancelled Successfully**\n\n💰 Refund will be processed within 3-5 business days\n📧 Cancellation confirmation sent to your email\n\nIs there anything else I can help you with?",
      timestamp: new Date(),
      options: [
        { id: "book_new", text: "📅 Book New Appointment", action: "greeting" },
        {
          id: "support",
          text: "📞 Contact Support",
          action: "contact_support",
        },
      ],
    };
  }

  async handleReschedule(): Promise<ChatMessage> {
    return {
      id: Date.now().toString(),
      type: "bot",
      content:
        "📅 **Reschedule Appointment**\n\nSelect a new time slot for your appointment:",
      timestamp: new Date(),
      options: [
        {
          id: "slot_1",
          text: "Tomorrow 10:00 AM",
          action: "confirm_reschedule",
          data: { newSlot: "Tomorrow 10:00 AM" },
        },
        {
          id: "slot_2",
          text: "Tomorrow 2:00 PM",
          action: "confirm_reschedule",
          data: { newSlot: "Tomorrow 2:00 PM" },
        },
        {
          id: "slot_3",
          text: "Day After Tomorrow 11:00 AM",
          action: "confirm_reschedule",
          data: { newSlot: "Day After Tomorrow 11:00 AM" },
        },
        { id: "back", text: "← Back", action: "greeting" },
      ],
    };
  }

  async confirmReschedule(newSlot: string): Promise<ChatMessage> {
    return {
      id: Date.now().toString(),
      type: "bot",
      content: `✅ **Appointment Rescheduled Successfully**\n\n📅 **New Slot:** ${newSlot}\n🔗 **Same join link will be used**\n📧 **Updated details sent to your email**\n\nYou'll receive a reminder 30 minutes before your new appointment time.`,
      timestamp: new Date(),
      options: [
        { id: "main_menu", text: "🏠 Back to Main Menu", action: "greeting" },
      ],
    };
  }

  // Helper method to handle different actions
  async handleAction(action: string, data?: any): Promise<ChatMessage[]> {
    switch (action) {
      case "greeting":
        return [await this.getGreetingMessage()];

      case "emergency_calling":
        return await this.handleEmergencyCall();

      case "browse_by_problem":
        return [await this.getBrowseByProblemOptions()];

      case "browse_by_language":
        return [await this.getBrowseByLanguageOptions()];

      case "browse_specialists":
        return await this.getPsychologistsByType(data.type);

      case "browse_language_specialists":
        return await this.getPsychologistsByLanguage(data.language);

      case "view_psychologist_details":
        return await this.getPsychologistDetails(data.psychologistId);

      case "booking_options":
        return [await this.getBookingOptions(data.psychologistId)];

      case "select_time_slot":
        return [await this.getTimeSlots(data)];

      case "confirm_booking":
        return [await this.confirmBooking(data)];

      case "process_payment":
        return await this.processPayment(data);

      case "cancel_booking":
        return [await this.handleCancelBooking()];

      case "confirm_cancellation":
        return [await this.confirmCancellation()];

      case "reschedule_booking":
        return [await this.handleReschedule()];

      case "confirm_reschedule":
        return [await this.confirmReschedule(data.newSlot)];

      default:
        return [await this.getGreetingMessage()];
    }
  }
}

export default new ChatbotService();

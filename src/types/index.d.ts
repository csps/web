declare global {
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
  type Role = "dean" | "adviser" | "admin";

  type ServerResponse<T> = {
    success: boolean,
    data: T,
    message: any,
    count?: number
  }

  type Officer = {
    name: string;
    position: string;
    thumb: string;
  }

  type DialogButton = {
    text: string,
    error?: boolean,
    click: () => void,
  }

  type CheckoutDetails = {
    variant?: ProductVariationModel,
    product: ProductModel
  }

  type DialogQueueItem = {
    id: string;
    show: boolean,
    title: string;
    message: string;
    ok?: DialogButton;
    cancel?: DialogButton | null;
    dismissible?: boolean;
    dialogHide?: () => void;
  };

  // Table types

  type TableHeader = {
    id: string,
    text: string,
    max?: number,
    align?: "left" | "right" | "center",
  }

  type TableData = {
    id: string,
    data: string
  }

  // Response Types

  type StudentResponse = {
    id: number;
    student_id: string;
    last_name: string;
    first_name: string;
    year_level: string;
    email_address: string;
    date_stamp: string;
  }
  
  type AnnouncementModel = {
    id: number,
    admin_student_id: string,
    title: string,
    content: string,
    photos_hash?: string,
    date_stamp: string
  }
  
  type ConfigModel = {
    id: number;
    key: string;
    value: string;
    date_stamp: string;
  }

  type EventModel = {
    id: number;
    photos_hash?: string;
    title: string;
    description: string;
    venue: string;
    date: string;
    start_time: string;
    end_time: string;
    date_stamp: string;
  }
  
  type OrderModel = {
    id: number;
    reference: string;
    unique_id: string;
    student_id: string;
    products_id: number;
    variations_id: number;
    quantity: number;
    mode_of_payment: ModeOfPayment;
    status: OrderStatus;
    user_remarks: string;
    admin_remarks: string;
    status_updated: string;
    edit_date: string;
    date_stamp: string;
  }
  
  type NonBscsOrderModel = {
    id: number;
    reference: string;
    unique_id: string;
    products_id: number;
    variations_id: number;
    quantity: number;
    mode_of_payment: ModeOfPayment;
    student_id: string;
    first_name: string;
    last_name: string;
    email_address: string;
    course: number;
    year_level: number;
    status: OrderStatus;
    user_remarks: string;
    admin_remarks: string;
    status_updated: string;
    edit_date: string;
    date_stamp: string;
  }
  
  type FullOrderModel = {
    id: string,
    photos_hash: string,
    reference: string,
    unique_id: string,
    products_id: number,
    product_name: string,
    product_price: number,
    variations_id: number,
    variations_name: string,
    variations_photo_hash: number,
    quantity: number,
    mode_of_payment: ModeOfPayment,
    student_id: string,
    first_name: string,
    last_name: string,
    email_address: string,
    course: number,
    year_level: number,
    status: OrderStatus,
    user_remarks: string,
    admin_remarks: string,
    status_updated: string,
    edit_date: string,
    date_stamp: string,
    is_guest: number, // Whether the student is guest (non-bscs) or not
  }
  
  type PhotoModel = {
    id: number;
    name?: string;
    type: string;
    data: Buffer;
    date_stamp: string;
  }
  
  type GCashUpploadsModel = {
    id: number;
    reference: string;
    name?: string;
    type: string;
    data: Buffer;
    date_stamp: string;
  }
  
  type ProductVariationModel = {
    id: number;
    products_id: number;
    variations_id: number;
    stock: number;
    photos_hash: string;
  
    // Extra
    name: string;
  }
  
  type ProductModel = {
    id: number;
    name: string;
    slug: string;
    photos_hash?: string;
    description: string;
    likes: number;
    stock: number;
    price: number;
    max_quantity: number;
    is_available: boolean;
    date_stamp?: string;
  
    // Extra
    variations: ProductVariationModel[];
  }
  
  type ResetTokenModel = {
    id: number;
    students_id: number;
    token: string;
    is_used: boolean;
    reset_date_stamp?: string;
    date_stamp: string;
  }
  
  type StudentModel = {
    id: number;
    student_id: string;
    last_name: string;
    first_name: string;
    year_level: string;
    email_address: string;
    password?: string;
    date_stamp: string;
  }
  
  type TutorialModel = {
    id: number;
    student_id: string;
    language: string;
    schedule: string;
    status: TutorialStatus;
    status_date_stamp: string;
    remarks: string;
    date_stamp: string;
  };
  
  type VariationModel = {
    id: number;
    name: string;
  };

  type TimelineData = {
    title: string,
    time: string,
    date: string,
    content: string,
    location?: string,
    link?: string
  }

  type NavigationRailItem = {
    id: string,
    title: string,
    icon: Icon,
  }

  type ICTAdminModel = {
    campus: string;
    campus_name: string;
    username: string;
  }

  type ICTStudentModel = {
    id: number;
    course: string;
    campus_id: number;
    student_id: string;
    rfid?: string;
    course_id: number;
    tshirt_size_id: number;
    year_level: string;
    first_name: string;
    last_name: string;
    email: string;
    discount_code: string;
    attendance?: string;
    payment_confirmed?: string;
    tshirt_claimed?: string;
    snack_claimed: number;
    kits_claimed: number;
    date_stamp: string;
  }

  type ICTStudentRegisterModel = {
    student_id: string;
    first_name: string;
    last_name: string;
    email: string;
    tshirt_size_id: number;
    campus_id: number;
    discount_code: string;
    course_id: number;
    year_level: number;
  }

  type ICTCourse = {
    id: number;
    course: string;
    course_name: string;
  }

  type ICTShirtSize = {
    id: number;
    code: string;
    name: string;
  }

  type ICTCampus = {
    id: number;
    campus: string;
    campus_name: string;
  }

  type ICTDiscountCode = {
    id: number;
    campus_id: number;
    code: string;
    price: number;
    expiration: string;
  }

  type CollegeModel = {
    id: number;
    acronym: string;
    name: string;
    courses?: CourseModel[];
  };

  type CourseModel = {
    id: number;
    college_id: number;
    acronym: string;
    name: string;
  }

  type TatakformModel = {
    id: number;
    slug: string;
    name: string;
    from_date: string;
    to_date: string;
    date_stamp: string;
  }
  
  type ICTStatistics = {
    countAll: number;
    countPendingPayments: number;
    countPresent: number;
    countSnackClaimed: number;
    countKitsClaimed: number;
    countPaymentConfirmed: number;
    countTShirtClaimed: number;
  }

  type StoreKeys = "dark" | "std_token" | "adm_token" | "home_msg_role" | "login_student_id" |
    "tabs_orders_status" | "tabs_orders_page" | "tabs_events_page" | "tabs_orders_sort" | "tabs_orders_column" | 
    "sat" | "srt" | "aat" | "art" | "iat" | "irt" | "usat" | "usrt" | "merch_checkout_student_details";
}

export {};
import { SiDiscord, SiGithub, SiGoogle, SiPrisma, SiX } from "@icons-pack/react-simple-icons";
import { AlertTriangle, ArrowDown, ArrowRight, ArrowUp, ArrowUpDown, BadgeCheck, BarChart, Bell, BookIcon, BookImageIcon, BookOpenText, Brain, Calendar, CalendarSearchIcon, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronsRightIcon, ChevronsUpDown, Circle, Clock, CoinsIcon, CopyIcon, CreditCard, DatabaseZapIcon, DollarSign, File, FileText, Folder, GlobeIcon, HelpCircle, HospitalIcon, Image as ImageIcon, Inbox, Laptop, LineChartIcon, Loader2, LockIcon, LogOut, LucideIcon, MailIcon, MapPin, Menu, Monitor, Moon, MoonStar, MoreHorizontal, MoreVertical, PencilIcon, PhoneIcon, Pizza, Plus, PuzzleIcon, SaveIcon, Search, Settings, Shield, Sparkles, SquareTerminal, Stethoscope, SunMedium, ToggleRightIcon, Trash, TrendingDown, TrendingUp, UserCircleIcon, UserCogIcon, UserPlus, Users, X, ZapIcon } from "lucide-react";
import { MdOutlineDescription, MdOutlineIntegrationInstructions, MdOutlineMemory } from "react-icons/md";





export type Icon = LucideIcon

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z"
        fill="#6366F1"
      />
      <path
        d="M22 12.5l-8.5 8.5L9 16.5"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Icons = {
  add: Plus,
  appointment: CalendarSearchIcon,
  approved: Check,
  arrowRight: ArrowRight,
  arrowUpDown: ArrowUpDown,
  badgeCheck: BadgeCheck,
  barChart: BarChart,
  bell: Bell,
  billing: CreditCard,
  blog: BookImageIcon,
  brain: Brain,
  calendar: Calendar,
  check: Check,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsUpDown: ChevronsUpDown,
  circle: Circle,
  clinic: HospitalIcon,
  clock: Clock,
  close: X,
  coins: CoinsIcon,
  contacted: MailIcon,
  contractSigned: FileText,
  copy: CopyIcon,
  creditCard: CreditCard,
  databaseZap: DatabaseZapIcon,
  demoCompleted: Check,
  demoScheduled: CalendarSearchIcon,
  description: MdOutlineDescription,
  discord: SiDiscord,
  document: BookIcon,
  dollarSign: DollarSign,
  down: ArrowDown,
  edit: PencilIcon,
  ellipsis: MoreVertical,
  folder: Folder,
  github: SiGithub,
  globe: GlobeIcon,
  google: SiGoogle,
  graph: LineChartIcon,
  help: HelpCircle,
  helpCircle: HelpCircle,
  inbox: Inbox,
  integrationInstructions: MdOutlineIntegrationInstructions,
  joined: UserPlus,
  laptop: Laptop,
  leave: LogOut,
  location: MapPin,
  lock: LockIcon,
  logOut: LogOut,
  logo: LogoIcon,
  logoLucide: ChevronsRightIcon,
  mail: MailIcon,
  media: ImageIcon,
  memory: MdOutlineMemory,
  menu: Menu,
  monitor: Monitor,
  moon: Moon,
  moonStar: MoonStar,
  more: MoreHorizontal,
  onboarding: UserCogIcon,
  orderbook: BookOpenText,
  page: File,
  pencil: PencilIcon,
  pending: Loader2,
  phone: PhoneIcon,
  pizza: Pizza,
  post: FileText,
  prisma: SiPrisma,
  puzzle: PuzzleIcon,
  question: HelpCircle,
  register: UserPlus,
  rejected: X,
  save: SaveIcon,
  search: Search,
  settings: Settings,
  shield: Shield,
  sparkles: Sparkles,
  spinner: Loader2,
  staff: Users,
  student: PencilIcon,
  studio: SquareTerminal,
  sun: SunMedium,
  teacher: UserCogIcon,
  therapist: Stethoscope,
  toggleRight: ToggleRightIcon,
  trash: Trash,
  trendingDown: TrendingDown,
  trendingUp: TrendingUp,
  twitter: SiX,
  up: ArrowUp,
  user: UserCircleIcon,
  userPlus: UserPlus,
  users: Users,
  warning: AlertTriangle,
  zap: ZapIcon,
}
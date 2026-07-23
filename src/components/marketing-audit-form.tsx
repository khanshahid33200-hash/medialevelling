import { useState } from 'react';
import { 
  Users, 
  Building, 
  Target, 
  Settings, 
  MessageSquare, 
  FileText, 
  Clock, 
  Award,
  Search,
  DollarSign,
  Share2,
  Mail,
  TrendingUp,
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Star, 
  Phone,
  Globe,
  MousePointer,
  Smartphone,
  Monitor,
  Wifi,
  Lock,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MarketingAuditFormProps {
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

export function MarketingAuditForm({ onSubmit, isSubmitting = false }: MarketingAuditFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    industry: '',
    monthlyBudget: '',
    timeline: '',
    primaryGoal: '',
    currentChallenges: '',
    services: [] as string[],
    hearAboutUs: '',
    additionalInfo: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const services = [
    { id: 'seo', label: 'Search Engine Optimization (SEO)', icon: Search },
    { id: 'ppc', label: 'Pay-Per-Click (PPC) Advertising', icon: DollarSign },
    { id: 'content-marketing', label: 'Content Marketing', icon: FileText },
    { id: 'social-media', label: 'Social Media Marketing', icon: Share2 },
    { id: 'email-marketing', label: 'Email Marketing', icon: Mail },
    { id: 'conversion-rate-optimization', label: 'Conversion Rate Optimization (CRO)', icon: TrendingUp }
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="shadow-2xl border-0 overflow-hidden bg-white rounded-xl">
          <div className="bg-white pb-6 px-8 pt-8">
            <h3 className="text-2xl font-normal text-center text-foreground">
              Free Digital Marketing Audit Request
            </h3>
            <p className="text-center text-muted-foreground mt-2">
              Complete this form to receive your comprehensive audit report
            </p>
          </div>
          <div className="p-8">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-sm font-semibold">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="mt-2"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-semibold">
                      Business Email *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="mt-2"
                      placeholder="your@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="text-sm font-semibold">
                      Company Name *
                    </label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      required
                      className="mt-2"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-semibold">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="website" className="text-sm font-semibold">
                      Website URL *
                    </label>
                    <Input
                      type="url"
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      required
                      className="mt-2"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="industry" className="text-sm font-semibold">
                      Industry *
                    </label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => handleInputChange('industry', value)}
                      required
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="monthlyBudget" className="text-sm font-semibold">
                      Monthly Marketing Budget
                    </label>
                    <Select
                      value={formData.monthlyBudget}
                      onValueChange={(value) => handleInputChange('monthlyBudget', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1k">Under $1,000</SelectItem>
                        <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                        <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                        <SelectItem value="50k-plus">$50,000+</SelectItem>
                        <SelectItem value="not-sure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="text-sm font-semibold">
                      Implementation Timeline
                    </label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => handleInputChange('timeline', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="When do you want to start?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediately">Immediately</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="2-3-months">2-3 months</SelectItem>
                        <SelectItem value="6-months">Within 6 months</SelectItem>
                        <SelectItem value="just-exploring">Just exploring options</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Goals & Challenges */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Goals & Challenges
                </h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="primaryGoal" className="text-sm font-semibold">
                      Primary Business Goal *
                    </label>
                    <Select
                      value={formData.primaryGoal}
                      onValueChange={(value) => handleInputChange('primaryGoal', value)}
                      required
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="What's your main objective?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="increase-traffic">Increase website traffic</SelectItem>
                        <SelectItem value="generate-leads">Generate more leads</SelectItem>
                        <SelectItem value="boost-sales">Boost online sales</SelectItem>
                        <SelectItem value="brand-awareness">Improve brand awareness</SelectItem>
                        <SelectItem value="reduce-costs">Reduce marketing costs</SelectItem>
                        <SelectItem value="improve-roi">Improve marketing ROI</SelectItem>
                        <SelectItem value="expand-market">Expand to new markets</SelectItem>
                        <SelectItem value="compete-better">Compete more effectively</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="currentChallenges" className="text-sm font-semibold">
                      Current Marketing Challenges *
                    </label>
                    <Textarea
                      id="currentChallenges"
                      value={formData.currentChallenges}
                      onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                      required
                      placeholder="Describe your biggest marketing challenges, what's not working, and what you've tried before..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>
                </div>
              </div>

              {/* Services of Interest */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Services of Interest
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select all services you'd like us to focus on in your audit:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer",
                        formData.services.includes(service.id) && "bg-accent/20 border-primary"
                      )}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <Checkbox
                        id={service.id}
                        checked={formData.services.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                        className="h-5 w-5 rounded-md"
                      />
                      <label
                        htmlFor={service.id}
                        className="flex items-center gap-2 cursor-pointer flex-1 text-sm font-medium leading-none"
                      >
                        <service.icon className="w-4 h-4" />
                        {service.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Additional Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="hearAboutUs" className="text-sm font-semibold">
                      How did you hear about us?
                    </label>
                    <Select
                      value={formData.hearAboutUs}
                      onValueChange={(value) => handleInputChange('hearAboutUs', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google-search">Google Search</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="referral">Referral from friend/colleague</SelectItem>
                        <SelectItem value="online-ad">Online Advertisement</SelectItem>
                        <SelectItem value="content">Blog/Content</SelectItem>
                        <SelectItem value="event">Event/Conference</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="additionalInfo" className="text-sm font-semibold">
                      Anything else you'd like us to know?
                    </label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      placeholder="Any specific areas of concern, previous marketing efforts, or additional context that would help us provide better recommendations..."
                      className="mt-2 min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 border-t">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="px-16 py-6 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Get My Free Audit Report
                      <Download className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  🔒 Your information is secure • Delivered within 24-48 hours • No spam, ever
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">What You'll Receive</h3>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                'Comprehensive 15-20 page audit report',
                'Technical SEO analysis & recommendations',
                'Competitor benchmarking & insights',
                'Conversion optimization opportunities',
                'Prioritized action plan with timelines',
                'Free 30-minute strategy consultation'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Quick Turnaround</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                'Submit form today',
                'We analyze your digital presence',
                'Receive detailed report in 24-48hrs'
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Trusted by 850+ Businesses</h3>
            <p className="text-sm text-muted-foreground">
              Join hundreds of successful businesses who've transformed their marketing with our audits.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

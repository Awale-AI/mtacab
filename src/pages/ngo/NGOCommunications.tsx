import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  LayoutDashboard, 
  Users, 
  Building,
  Ticket, 
  MessageSquare, 
  BarChart3,
  Send,
  Phone,
  Radio,
  Clock,
  UserPlus
} from "lucide-react";

const navItems = [
  { label: "Program Overview", href: "/ngo", icon: LayoutDashboard },
  { label: "Farmer Lookup", href: "/ngo/beneficiaries", icon: Users },
  { label: "Cooperatives & VSLAs", href: "/ngo/cooperatives", icon: Building },
  { label: "Vouchers & Subsidies", href: "/ngo/vouchers", icon: Ticket },
  { label: "Communications", href: "/ngo/communications", icon: MessageSquare },
  { label: "Monitoring & Reports", href: "/ngo/reports", icon: BarChart3 },
];

const recentCampaigns = [
  { id: 1, type: "SMS", title: "Weather Alert - Heavy Rain", recipients: 1245, sent: "Jan 8, 2025", status: "Delivered" },
  { id: 2, type: "SMS", title: "Voucher Activation Notice", recipients: 430, sent: "Jan 5, 2025", status: "Delivered" },
  { id: 3, type: "IVR", title: "Pest Alert Voice Message", recipients: 892, sent: "Jan 2, 2025", status: "Completed" },
  { id: 4, type: "SMS", title: "Cooperative Meeting Reminder", recipients: 156, sent: "Dec 28, 2024", status: "Delivered" },
];

export default function NGOCommunications() {
  const { toast } = useToast();
  const [smsDialogOpen, setSmsDialogOpen] = useState(false);
  const [ivrDialogOpen, setIvrDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateSMS = () => setSmsDialogOpen(true);
  const handleCreateIVR = () => setIvrDialogOpen(true);

  const handleSendSMS = () => {
    toast({
      title: "SMS Campaign Created",
      description: "Your SMS campaign has been queued for delivery.",
    });
    setSmsDialogOpen(false);
    setMessage("");
  };

  const handleSendIVR = () => {
    toast({
      title: "IVR Campaign Created",
      description: "Your voice message campaign has been queued.",
    });
    setIvrDialogOpen(false);
    setMessage("");
  };

  const handleUseTemplate = (templateName: string) => {
    toast({
      title: "Template Selected",
      description: `Loading "${templateName}" template.`,
    });
    setMessage(`[${templateName}] - Your message here...`);
    setSmsDialogOpen(true);
  };

  return (
    <PortalLayout 
      title="NGO Portal" 
      role="ngo" 
      navItems={navItems}
      userName="Sarah Okonkwo"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">Communications</h1>
          <p className="text-muted-foreground">Send SMS and IVR messages to beneficiaries</p>
        </div>

        {/* Communication Channels */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-ngo/10">
                <MessageSquare className="w-6 h-6 text-ngo" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">SMS Campaigns</h2>
                <p className="text-sm text-muted-foreground">Bulk text messages</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Send targeted SMS messages to beneficiaries. Great for alerts, reminders, and short notifications.
            </p>
            <Button variant="ngo" className="w-full" onClick={handleCreateSMS}>
              <Send className="w-4 h-4 mr-2" />
              Create SMS Campaign
            </Button>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-accent/20">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">IVR Voice Calls</h2>
                <p className="text-sm text-muted-foreground">Automated voice messages</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Reach farmers who prefer voice messages. Supports local languages for better accessibility.
            </p>
            <Button variant="outline" className="w-full" onClick={handleCreateIVR}>
              <Radio className="w-4 h-4 mr-2" />
              Create IVR Campaign
            </Button>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="bg-card border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b">
            <h2 className="font-semibold text-foreground">Recent Campaigns</h2>
          </div>
          <div className="divide-y">
            {recentCampaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toast({ title: campaign.title, description: `Sent to ${campaign.recipients} recipients on ${campaign.sent}` })}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${campaign.type === "SMS" ? "bg-ngo/10" : "bg-accent/10"}`}>
                    {campaign.type === "SMS" ? (
                      <MessageSquare className="w-4 h-4 text-ngo" />
                    ) : (
                      <Phone className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{campaign.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {campaign.recipients.toLocaleString()} recipients • {campaign.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-green-600">{campaign.status}</span>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {campaign.sent}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Templates */}
        <div className="bg-muted/30 border rounded-xl p-5">
          <h3 className="font-medium text-foreground mb-3">Quick Message Templates</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: "Weather Alert", desc: "Notify about upcoming weather conditions" },
              { name: "Voucher Ready", desc: "Inform farmers their vouchers are active" },
              { name: "Meeting Reminder", desc: "Cooperative or VSLA meeting notice" },
              { name: "Market Prices", desc: "Current prices for common crops" },
            ].map((template) => (
              <button 
                key={template.name}
                className="text-left p-3 bg-card border rounded-lg hover:border-ngo/50 transition-colors"
                onClick={() => handleUseTemplate(template.name)}
              >
                <p className="text-sm font-medium text-foreground">{template.name}</p>
                <p className="text-xs text-muted-foreground">{template.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SMS Dialog */}
      <Dialog open={smsDialogOpen} onOpenChange={setSmsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create SMS Campaign</DialogTitle>
            <DialogDescription>Compose your message to send to beneficiaries.</DialogDescription>
          </DialogHeader>
          <Textarea 
            placeholder="Enter your message..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setSmsDialogOpen(false)}>Cancel</Button>
            <Button variant="ngo" onClick={handleSendSMS}>
              <Send className="w-4 h-4 mr-1" /> Send Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* IVR Dialog */}
      <Dialog open={ivrDialogOpen} onOpenChange={setIvrDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create IVR Campaign</DialogTitle>
            <DialogDescription>Record or upload your voice message script.</DialogDescription>
          </DialogHeader>
          <Textarea 
            placeholder="Enter your voice message script..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIvrDialogOpen(false)}>Cancel</Button>
            <Button variant="ngo" onClick={handleSendIVR}>
              <Radio className="w-4 h-4 mr-1" /> Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
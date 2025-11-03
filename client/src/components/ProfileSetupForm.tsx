import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { User, Activity, Briefcase } from "lucide-react";

export default function ProfileSetupForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    activityLevel: '',
    workingHours: ''
  });

  const calculateWaterGoal = () => {
    const weight = parseInt(formData.weight) || 70;
    const baseIntake = weight * 35;
    const activityMultiplier = formData.activityLevel === 'high' ? 1.2 : formData.activityLevel === 'medium' ? 1.1 : 1;
    return Math.round(baseIntake * activityMultiplier);
  };

  const handleNext = () => {
    console.log('Step completed:', step, formData);
    if (step < 3) {
      setStep(step + 1);
    } else {
      const goal = calculateWaterGoal();
      console.log('Profile setup complete! Daily water goal:', goal, 'ml');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-8">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold">Complete Your Profile</h2>
          <p className="text-muted-foreground">
            Help us personalize your hydration goals based on your lifestyle
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        
        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Basic Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    data-testid="input-age"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger id="gender" data-testid="select-gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Body Metrics</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    data-testid="input-weight"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    data-testid="input-height"
                  />
                </div>
              </div>
              
              {formData.weight && formData.height && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Your BMI:</p>
                  <p className="text-2xl font-bold">
                    {(parseInt(formData.weight) / Math.pow(parseInt(formData.height) / 100, 2)).toFixed(1)}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Lifestyle</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}
                  >
                    <SelectTrigger id="activityLevel" data-testid="select-activity">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Sedentary)</SelectItem>
                      <SelectItem value="medium">Medium (Moderate Exercise)</SelectItem>
                      <SelectItem value="high">High (Very Active)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workingHours">Daily Working Hours</Label>
                  <Input
                    id="workingHours"
                    type="number"
                    placeholder="8"
                    value={formData.workingHours}
                    onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                    data-testid="input-working-hours"
                  />
                </div>
              </div>
              
              {formData.weight && formData.activityLevel && (
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
                  <p className="text-sm text-muted-foreground">Your Recommended Daily Goal:</p>
                  <p className="font-mono text-4xl font-bold text-primary">
                    {calculateWaterGoal()} ml
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Based on your weight, activity level, and working hours
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={() => setStep(step - 1)}
              data-testid="button-back"
            >
              Back
            </Button>
          )}
          <Button 
            className="flex-1" 
            onClick={handleNext}
            data-testid="button-next"
          >
            {step === 3 ? 'Complete Setup' : 'Next'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

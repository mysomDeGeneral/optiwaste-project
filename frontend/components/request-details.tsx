"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import DynamicMap from "./dynamic-map"
import { getAddress } from "@/apis/api"

export function RequestDetails() {
  const [location, setLocation] = useState('');
  const [selectedLng, setSelectedLng] = useState<number | null>(null);
  const [selectedLat, setSelectedLat] = useState<number | null>(null);
  const [wasteType, setWasteType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLocationSelect = (lng: number, lat: number) => {
    setSelectedLng(lng);
    setSelectedLat(lat);
  };

  const handleConfirmLocation = async () => {
    if (selectedLng !== null && selectedLat !== null) {
      try {
        const response = await getAddress(selectedLng.toString(), selectedLat.toString());
        console.log(response);
        if (response && response.address) {
          setLocation(response.address);
          setIsDrawerOpen(false);
        } else {
          console.error('Invalid address format received');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ location, wasteType, quantity, instructions });
  };

  return (
    <main className="flex-1 overflow-y-auto flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-8">
      <div className="grid gap-6 p-4 md:p-6 w-full max-w-4xl">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Request Waste Collection</h1>
              <p className="text-muted-foreground md:text-xl">
                Fill out the form below to schedule a waste pickup at your location.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 relative">
                    <Input
                      id="location"
                      type="text"
                      placeholder="Enter your digital address (eg. AOK6806973)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pr-24"
                    />
                    {location && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        Selected
                      </div>
                    )}
                  </div>
                  <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerTrigger asChild>
                      <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>
                        Select on Map
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="h-[80vh]">
                      <DrawerHeader>
                        <DrawerTitle>Select Location</DrawerTitle>
                        <DrawerDescription>Choose a location on the map for your waste pickup.</DrawerDescription>
                      </DrawerHeader>
                      <div className="flex-1 p-4">
                        <div className="h-[calc(100%-120px)]">
                          <DynamicMap onSelectLocation={handleLocationSelect} />
                        </div>
                        {location && (
                          <div className="mt-4 p-3 bg-gray-100 rounded-md shadow-sm">
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Selected Location</h4>
                            <p className="text-sm text-gray-600">{location}</p>
                          </div>
                        )}
                      </div>
                      <DrawerFooter>
                        <Button onClick={handleConfirmLocation}>Confirm Location</Button>
                        <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Close Map</Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="waste-type">Waste Type</Label>
                  <Select onValueChange={setWasteType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select waste type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Waste</SelectItem>
                      <SelectItem value="recycling">Recycling</SelectItem>
                      <SelectItem value="organic">Organic Waste</SelectItem>
                      <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="instructions">Special Instructions</Label>
                <Textarea
                  id="instructions"
                  rows={3}
                  placeholder="Enter any special instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <Button type="submit" className="w-full py-6 text-lg">Request Pickup</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
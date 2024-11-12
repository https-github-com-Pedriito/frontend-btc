import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function ReservationPage() {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [guests, setGuests] = useState('2')

  const isDateSelectable = (date: Date) => {
    const day = date.getDay()
    // Mardi (2) à Dimanche (0)
    return day >= 2 || day === 0
  }

  const lunchTimes = ['12:00', '12:30', '13:00', '13:30', '14:00']
  const dinnerTimes = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']

  const isTimeSelectable = (time: string) => {
    if (!date) return false
    const now = new Date()
    const [hours, minutes] = time.split(':').map(Number)
    const selectedDateTime = new Date(date)
    selectedDateTime.setHours(hours, minutes)
    return selectedDateTime > now
  }

  const handleContinue = () => {
    if (date && time) {
      setStep(2)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the reservation data to your backend
    console.log('Reservation submitted:', { name, email, phone, guests: Number(guests), date, time })
    // Reset the form or show a confirmation message
    alert('Réservation confirmée !')
    // Reset the form
    setStep(1)
    setDate(undefined)
    setTime(null)
    setName('')
    setEmail('')
    setPhone('')
    setGuests('2')
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-white ">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="">Réservation de Table</CardTitle>
          <CardDescription className="">
            {step === 1 ? "Choisissez une date et une heure pour votre réservation" : "Complétez les détails de votre réservation"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sélectionnez une date</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => setDate(newDate || undefined)}
                  disabled={(date) => !isDateSelectable(date) || date < new Date()}
                  locale={fr}
                  className="rounded-md  "
                />
              </div>
              {date && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold ">Sélectionnez une heure</h3>
                  <div>
                    <h4 className="font-medium mb-2">Déjeuner</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {lunchTimes.map((t) => (
                        <Button
                          key={t}
                          onClick={() => setTime(t)}
                          disabled={!isTimeSelectable(t)}
                          variant={time === t ? "default" : "outline"}
                          className={`${time === t ? 'bg-green-600 text-black' : ' border-green-500'} hover:bg-green-500 hover:text-black`}
                        >
                          {t}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Dîner</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {dinnerTimes.map((t) => (
                        <Button
                          key={t}
                          onClick={() => setTime(t)}
                          disabled={!isTimeSelectable(t)}
                          variant={time === t ? "default" : "outline"}
                          className={`${time === t ? 'bg-green-600 text-black' : ' border-green-500'} hover:bg-green-500 hover:text-black`}
                        >
                          {t}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {date && time && (
                <div className="space-y-2">
                  <p ><strong>Date sélectionnée :</strong> {format(date, 'dd MMMM yyyy', { locale: fr })}</p>
                  <p ><strong>Heure sélectionnée :</strong> {time}</p>
                  <Button onClick={handleContinue} className="w-full bg-green-600 text-black hover:bg-green-500">
                    Continuer
                  </Button>
                </div>
              )}
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="">Nom</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="  border-green-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="  border-green-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="">Téléphone</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="  border-green-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests" className="">Nombre de convives</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="  border-green-500">
                    <SelectValue placeholder="Sélectionnez le nombre de convives" />
                  </SelectTrigger>
                  <SelectContent className="  border-green-500">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()} className="hover:bg-green-600 hover:text-black">
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className=""><strong>Date sélectionnée :</strong> {date && format(date, 'dd MMMM yyyy', { locale: fr })}</p>
                <p className=""><strong>Heure sélectionnée :</strong> {time}</p>
              </div>
              <div className="space-y-2">
                <Button  disabled={true} type="submit" className="w-full bg-green-600 text-black hover:bg-green-500">Confirmer la réservation</Button>
                <Button type="button" variant="outline" className="w-full  border-green-500 hover:bg-green-600 hover:text-black" onClick={() => setStep(1)}>
                  Retour
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

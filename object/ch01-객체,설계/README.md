# ch01. 객체, 설계

## 티겟 판매 애플리케이션 구현하기

```typescript
class Invitation {
  private when: Date;

  constructor(when: Date) {
    this.when = when;
  }
}
```
```typescript
class Ticket {
  private fee: number;

  getFeee(): number {
    return fee;
  }
}
```
```typescript
class Bag {
  private amount: number;
  private invitaton: Invitation;
  private ticket: Ticket;

  constructor(amount: number, invitation?: Invitation) {
    this.amount = amount;
    this.invitation = invitation ?? null;
  }

  hasInvitatoin(): boolean {
    return invitation != null;
  }
  hasTicket(): boolean {
    return ticket != null;
  }
  setTicket(ticket: Ticket): void {
    this.ticket = ticket
  }
  minusAmount(amount: number): void {
    this.amount -= amount;
  }
  plusAmount(amount: number): void {
    this.amount += amount;
  }
}
```
```typescript
class Audience {
  private bag: Bag;
  
  constructor(bag: Bag) {
    this.bag = bag;
  }

  getBag(): Bag {
    return bag;
  }
}
```
```typescript
class TicketOffice {
  private amount: number;
  private tickets: Array<Ticket> = [];

  constructor(amount: number, ...tickets:Array<Ticket>) {
    this.amount = amount;
    this.tickets = tickets;
  }

  getTicket(): Ticket {
    return tickets.shift();
  }

  minusAmount(amount: number): void {
    this.amount -= amount;
  }

  plusAmount(amount: number): void {
    this.amount += amount;
  }
}
```
```typescript
class TicketSeller {
  private ticketOffice: TicketOffice;
  
  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  getTicketOffice(): TicketOffice {
    return ticketOffice;
  }
}
```
```typescript
class Theater {
  private ticketSeller: TicketSeller;
  
  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  enter(audience: Audience): void {
    if (audience.getBag().hsiInvitation()) {
      const ticket:Ticket = ticketSeller.getTicketOffice().getTicket();
      audience.getBag().setTicket(ticket);
    } else {
      const ticket:Ticket = ticketSeller.getTicketOffice().getTicket();
      audience.getBag().minusAmount(ticket.getFee());
      ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
      audience.getBag().setTicket(ticket);
    }
  }
}
```

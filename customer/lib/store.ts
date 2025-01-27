import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
  };
  customization?: {
    options: string[];
    maxSelections: number;
  };
}

export interface GroupMember {
  id: string;
  name: string;
  items: {
    menuItemId: string;
    quantity: number;
    customizations: string[];
  }[];
}

interface OrderState {
  tableNumber: string | null;
  groupCode: string | null;
  members: GroupMember[];
  currentMemberId: string | null;
  setTableNumber: (tableNumber: string) => void;
  setGroupCode: (code: string) => void;
  addMember: (name: string) => void;
  setCurrentMember: (memberId: string) => void;
  addItemToMember: (memberId: string, menuItemId: string, customizations?: string[]) => void;
  removeItemFromMember: (memberId: string, menuItemId: string) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      tableNumber: null,
      groupCode: null,
      members: [],
      currentMemberId: null,

      setTableNumber: (tableNumber) => set({ tableNumber }),
      
      setGroupCode: (code) => set({ groupCode: code }),
      
      addMember: (name) => set((state) => {
        const newMember: GroupMember = {
          id: Math.random().toString(36).substring(7),
          name,
          items: []
        };
        return { 
          members: [...state.members, newMember],
          currentMemberId: newMember.id 
        };
      }),

      setCurrentMember: (memberId) => set({ currentMemberId: memberId }),

      addItemToMember: (memberId, menuItemId, customizations = []) => 
        set((state) => ({
          members: state.members.map(member => 
            member.id === memberId
              ? {
                  ...member,
                  items: [...member.items, { menuItemId, quantity: 1, customizations }]
                }
              : member
          )
        })),

      removeItemFromMember: (memberId, menuItemId) =>
        set((state) => ({
          members: state.members.map(member =>
            member.id === memberId
              ? {
                  ...member,
                  items: member.items.filter(item => item.menuItemId !== menuItemId)
                }
              : member
          )
        })),

      clearOrder: () => set({
        tableNumber: null,
        groupCode: null,
        members: [],
        currentMemberId: null
      })
    }),
    {
      name: 'order-storage'
    }
  )
);
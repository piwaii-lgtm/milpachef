export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          access_token: string
          amount_mxn: number
          created_at: string
          currency: string
          guest_email: string
          guest_name: string
          id: string
          notes: string | null
          paid_at: string | null
          party_size: number
          status: string
          stripe_payment_intent: string | null
          stripe_session_id: string | null
          tour_id: string
          unit_price_mxn: number | null
        }
        Insert: {
          access_token?: string
          amount_mxn: number
          created_at?: string
          currency?: string
          guest_email: string
          guest_name: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          party_size?: number
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          tour_id: string
          unit_price_mxn?: number | null
        }
        Update: {
          access_token?: string
          amount_mxn?: number
          created_at?: string
          currency?: string
          guest_email?: string
          guest_name?: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          party_size?: number
          status?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          tour_id?: string
          unit_price_mxn?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          created_at: string
          featured: boolean
          guest_name: string
          id: string
          origin: string
          quote_en: string
          quote_es: string
          quote_fr: string
          rating: number
        }
        Insert: {
          created_at?: string
          featured?: boolean
          guest_name: string
          id?: string
          origin: string
          quote_en: string
          quote_es: string
          quote_fr: string
          rating?: number
        }
        Update: {
          created_at?: string
          featured?: boolean
          guest_name?: string
          id?: string
          origin?: string
          quote_en?: string
          quote_es?: string
          quote_fr?: string
          rating?: number
        }
        Relationships: []
      }
      tours: {
        Row: {
          capacity: number
          created_at: string
          description_en: string
          description_es: string
          description_fr: string
          duration_minutes: number
          id: string
          image_key: string
          meeting_point: string
          price_mxn: number
          slug: string
          spots_left: number
          title: string
          tour_date: string
        }
        Insert: {
          capacity?: number
          created_at?: string
          description_en: string
          description_es: string
          description_fr: string
          duration_minutes?: number
          id?: string
          image_key?: string
          meeting_point: string
          price_mxn?: number
          slug: string
          spots_left?: number
          title: string
          tour_date: string
        }
        Update: {
          capacity?: number
          created_at?: string
          description_en?: string
          description_es?: string
          description_fr?: string
          duration_minutes?: number
          id?: string
          image_key?: string
          meeting_point?: string
          price_mxn?: number
          slug?: string
          spots_left?: number
          title?: string
          tour_date?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      confirm_booking_and_decrement: {
        Args: {
          _booking_id: string
          _payment_intent: string
          _session_id: string
        }
        Returns: {
          already_paid: boolean
          amount_mxn: number
          booking_id: string
          guest_email: string
          guest_name: string
          meeting_point: string
          party_size: number
          tour_date: string
          tour_id: string
          tour_title: string
        }[]
      }
      expire_stale_bookings: { Args: never; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      mark_booking_failed: { Args: { _booking_id: string }; Returns: undefined }
      refund_booking_and_restore: {
        Args: { _booking_id: string }
        Returns: {
          booking_id: string
          party_size: number
          tour_id: string
          was_paid: boolean
        }[]
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const

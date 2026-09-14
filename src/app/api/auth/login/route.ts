import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { phone, email, password, otp } = body

    if (!phone && !email) {
      return NextResponse.json(
        { error: 'Phone number or email is required' },
        { status: 400 }
      )
    }

    // Return success customer user session object
    const userPayload = {
      fullName: 'Muhammad Ali',
      email: email || 'ali.watlys@example.com',
      phone: phone || '+92 300 1234567',
      addressList: [
        {
          addressLabel: 'Home',
          street: '14-B, Main Boulevard, Gulberg III',
          city: 'Lahore',
          postalCode: '54000',
        },
      ],
      activeSubscription: {
        packageType: 'Family Plan (19L)',
        frequency: 'weekly',
        bottleQty: 4,
        status: 'active',
      },
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userPayload,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Authentication error' },
      { status: 500 }
    )
  }
}
